from powerful import (
    download_video,
    download_path_video,
    download_audio_video,
    YouTube,
    get_video_size,
)
import sys


# def show_available_qualities(url):
#     try:
#         yt = YouTube(url)
#         available_qualities = [
#             stream.resolution for stream in yt.streams if stream.resolution is not None
#         ]
#         print(
#             f"Available qualities for video '{yt.title}': {', '.join(available_qualities)}"
#         )

#     except Exception as e:
#         print(f"Error: {e}")


if __name__ == "__main__":
    url = sys.argv[1]
    reso = sys.argv[2]
    if reso == "audio":
        download_audio_video(url)
    else:
        download_path_video(url, "", reso)
