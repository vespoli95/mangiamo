from flask import Flask

from flask_assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)

css = Bundle('C:\\Users\\antve\\node_modules\\bootstrap\\dist\\css\\bootstrap.min.css',
             'css/style.css', 
             output='dist/bundle.css')
assets.register('css_all', css)

js = Bundle('C:\\Users\\antve\\node_modules\\jquery\\dist\\jquery.min.js',
            'C:\\Users\\antve\\node_modules\\bootstrap\\dist\\js\\bootstrap.bundle.min.js',
            'C:\\Users\\antve\\node_modules\\bootstrap\\dist\\js\\bootstrap.min.js',
            'js/index.jsx', output='dist/bundle.js')
assets.register('js_all', js)

