from youtube_transcript_api import YouTubeTranscriptApi

import re


def extract_video_id(url: str):

    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"

    match = re.search(pattern, url)

    if match:

        return match.group(1)

    return None


def get_youtube_transcript(url: str):

    video_id = extract_video_id(url)

    ytt_api = YouTubeTranscriptApi()

    transcript_data = ytt_api.fetch(

        video_id,

        languages=["en-IN", "en"]
    )

    transcript = " ".join(

        [item.text for item in transcript_data]
    )

    return transcript