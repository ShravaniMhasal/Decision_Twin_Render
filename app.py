from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)

from flask_mail import Mail, Message

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "shravanimnextgen@gmail.com"
app.config["MAIL_PASSWORD"] = "imznbnbehufikkog"
app.config["MAIL_DEFAULT_SENDER"] = "shravanimnextgen@gmail.com"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "decision_twin_secret"

mail = Mail(app)

serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])

db.init_app(app)

with app.app_context():
    import os

    print("Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])
    print("Database file:", os.path.abspath("instance/database.db"))
    db.create_all()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):

            print("Email:", user.email)
            print("Role:", user.role)

            session["user_id"] = user.id
            session["username"] = user.username
            session["role"] = user.role

            flash("Login successful!")

            if user.role == "admin":
                return redirect(url_for("admin_dashboard"))
            else:
                return redirect(url_for("dashboard"))

        flash("Invalid email or password!")

    return render_template("login/index.html")

@app.route("/signup", methods=["POST"])
def signup():
    username = request.form["username"]
    email = request.form["email"]
    password = request.form["password"]

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        flash("Email already exists!")
        return redirect(url_for("login"))

    hashed_password = generate_password_hash(password)

    role = "admin" if email == "shravanimnextgen@gmail.com" else "user"

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        role=role
    )

    db.session.add(new_user)
    db.session.commit()

    flash("Account created successfully!")
    return redirect(url_for("login"))

@app.route("/forgot_password", methods=["POST"])
def forgot_password():

    email = request.form["email"]

    user = User.query.filter_by(email=email).first()

    if not user:
        flash("No account found with that email.")
        return redirect(url_for("login"))

    token = serializer.dumps(user.email, salt="password-reset")

    reset_link = url_for(
    "reset_password",
    token=token,
    _external=True
)

    msg = Message(
        subject="Decision Twin Password Reset",
        recipients=[email]
    )

    msg.body = f"""
Hello {user.username},

We received a request to reset your Decision Twin password.

Click the link below to reset your password:

{reset_link}

This link will expire in 30 minutes.

If you did not request this, you can safely ignore this email.

Decision Twin Team
"""

    mail.send(msg)

    flash("Password reset email sent successfully!")
    return redirect(url_for("login"))

@app.route("/reset_password/<token>", methods=["GET", "POST"])
def reset_password(token):

    try:
        email = serializer.loads(
            token,
            salt="password-reset",
            max_age=1800
        )
    except:
        flash("This password reset link is invalid or has expired.")
        return redirect(url_for("login"))

    user = User.query.filter_by(email=email).first()

    if request.method == "POST":

        new_password = request.form["password"]
        confirm_password = request.form["confirm_password"]

        if len(new_password) < 8:
            flash("Password must be at least 8 characters long.")
            return render_template("reset_password.html")

        if new_password != confirm_password:
            flash("Passwords do not match.")
            return render_template("reset_password.html")

        user.password = generate_password_hash(new_password)

        db.session.commit()

        flash("Password reset successful! Please log in.")
        return redirect(url_for("login"))

    return render_template("reset_password.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard/dashboard.html")


@app.route("/admin")
def admin_dashboard():
    return render_template("adminpanel/admin_dashboard.html")

@app.route("/manage_users")
def manage_users():
    users = User.query.all()
    return render_template("adminpanel/manage_users.html", users=users)


@app.route("/career_management")
def career_management():
    return render_template("adminpanel/career_management.html")


@app.route("/notifications")
def notifications():
    return render_template("adminpanel/notifications.html")


@app.route("/settings")
def settings():
    return render_template("adminpanel/settings.html")


@app.route("/latest_recommendation")
def latest_recommendation():
    return render_template("adminpanel/latest_recommendation.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("Logged out successfully!")
    return redirect(url_for("login"))

@app.route("/promote_user/<int:user_id>")
def promote_user(user_id):

    user = User.query.get_or_404(user_id)

    user.role = "admin"

    db.session.commit()

    return redirect(url_for("manage_users"))

@app.route("/compare")
def compare():
    return render_template("compare/compare.html")


@app.route("/mentor")
def mentor():
    return render_template("AImentor/mentor.html")


@app.route("/roi")
def roi():
    return render_template("ROI_calculator/roi.html")

@app.route("/saved-reports")
def saved_reports():
    return render_template("dashboard/saved-reports.html")

@app.route("/career-roadmap")
def career_roadmap():
    return render_template("roadmap/career-roadmap.html")

@app.route("/resume-analyser")
def resume_analyser():
    return render_template("resume/resume-analyser.html")

@app.route("/profile")
def profile():
    return render_template("profile/profile.html")

if __name__ == "__main__":
    print("Template folder:", app.template_folder)
    print("Root path:", app.root_path)
    app.run(debug=True)