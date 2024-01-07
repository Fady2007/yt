from powerful import (
    render_template,
    get_video_size,
    jsonify,
    sayHello,
    download_video,
    download_path_video,
)
from flask import request, Flask
import subprocess

app = Flask(__name__, static_folder="static")

# https://www.youtube.com/watch?v=0yZcDeVsj_Y
sayHello()


@app.route("/")
def home():
    return render_template("youtubeDown/index.html", ti="ti")


@app.route("/about")
def about():
    return render_template("youtubeDown/about.html")


# @app.route("/d", methods=["POST"])
# def downloadyt():
#     value = request.args.get("val", "")
#     reso = request.args.get("reso", "")
#     try:
#         result = subprocess.check_output(["python", "ytWeb.py", value, reso])
#     except subprocess.CalledProcessError as e:
#         print(e.output)
#         return None

#     return result


@app.route("/d", methods=["POST"])
def download():
    try:
        video_url = request.args.get("val")
        video_reso = request.args.get("reso")
        result = download_path_video(video_url, r"C:\Users\jerom\Downloads", video_reso)

        if result:  # Assuming a non-null result indicates success
            return jsonify({"success": True, "result": result})
        else:
            return jsonify(
                {"success": False, "error": "Download failed or returned None"}
            )
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


@app.route("/size", methods=["GET"])
def sizePage():
    video_url = request.args.get("value")
    video_size = get_video_size(video_url)
    return jsonify({"size": video_size})


@app.route("/qr")
def qrPage():
    return render_template("qrCode.html")


@app.route("/df")
def df():
    return render_template("df.html")


@app.route("/save")
def sv():
    return render_template("save.html")


@app.route("/downloadQr")
def downQr():
    value = request.args.get("value", "")
    result = subprocess.check_output(["python", "qr.py", value])
    return result


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)

# 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
