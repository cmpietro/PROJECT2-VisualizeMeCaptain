import os
from flask import Flask, render_template
import SQLAlchemy


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# uncomment this out - and place the file producing results within ()
# from ( FILE NAME HERE )import Result


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()

#  OR 
from flask import Flask

app = Flask(__name__)

app.config['debug']=True

@app.route('/')
def fourVisualizations():
    return 

    