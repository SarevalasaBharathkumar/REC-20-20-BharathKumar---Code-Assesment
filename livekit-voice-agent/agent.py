from dotenv import load_dotenv

from livekit import agents
from livekit.agents import AgentServer, AgentSession, Agent, inference, room_io, TurnHandlingOptions
from livekit.plugins import ai_coustics

import os
from pinecone import Pinecone
from pinecone_plugins.assistant.models.chat import Message
from livekit.agents import function_tool

from livekit.agents import BackgroundAudioPlayer, AudioConfig, BuiltinAudioClip
from prompts import RGUKT_CAREER_AGENT_PROMPT

#Update the instrucitons line
instructions=Jaggaer

load_dotenv(".env.local")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a helpful voice AI assistant.
            You eagerly assist users with their questions by providing information from your extensive knowledge.
            Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.
            You are curious, friendly, and have a sense of humor.""",
        )

        tools=[ask_knowledge_base]

server = AgentServer()

@server.rtc_session(agent_name="my-agent")
async def my_agent(ctx: agents.JobContext):
    session = AgentSession(
        stt=inference.STT(model="deepgram/nova-3", language="multi"),
        llm=inference.LLM(model="openai/chat-latest"),
        tts=inference.TTS(
            model="cartesia/sonic-3",
            voice="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        ),
        turn_handling=TurnHandlingOptions(
            turn_detection=inference.TurnDetector(),
        ),
    )

    avatar = bey.AvatarSession(
    avatar_id="70b1b917-ed16-4531-bb6c-b0bdb79449b4"
)


    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=ai_coustics.audio_enhancement(model=ai_coustics.EnhancerModel.QUAIL_VF_S),
            ),
        ),
        room_input_options=RoomInputOptions(
    noise_cancellation=noise_cancellation.BVC(),
    video_enabled=True,
    )
    )
    
    background_audio = BackgroundAudioPlayer(
    thinking_sound=[
        AudioConfig(BuiltinAudioClip.KEYBOARD_TYPING, volume=1),
        AudioConfig(BuiltinAudioClip.KEYBOARD_TYPING2, volume=1),
    ],
)

    await background_audio.start(room=ctx.room, agent_session=session)

    await session.generate_reply(
        instructions="Greet the user and offer your assistance."
    )

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
assistant = pc.assistant.Assistant(
    assistant_name=os.environ["ASSISTANT_NAME"]
)

@function_tool
async def ask_knowledge_base(question: str) -> str:
    """Query the Pinecone Assistant knowledge base."""
    msg = Message(role="user", content=question)
    resp = assistant.chat(messages=[msg])
    return resp.message.content


if __name__ == "__main__":
    agents.cli.run_app(server)