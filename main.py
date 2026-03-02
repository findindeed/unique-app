from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Mock Product Data
PRODUCTS = [
    {
        "id": "double-header-napkin",
        "name": "Double Header Tissue Napkin Machine",
        "model": "FLY_33/40",
        "description": "High-speed machine designed for precision and durability. 700 sheets per minute capacity.",
        "features": ["700 Sheets/Min", "4 Color Flexo Printing", "24ft x 6 x 6 Dimension", "Double Header"],
        "image": "/input_file_3.png"
    },
    {
        "id": "single-embossing-napkin",
        "name": "Single Embossing Tissue Napkin Machine",
        "model": "FLY_300",
        "description": "Cost-effective solution for small to medium scale industries seeking high-quality output.",
        "features": ["700 Sheets/Min", "Single Color Printing", "18ft x 4 x 6 Dimension", "Easy to Operate"],
        "image": "/input_file_5.png"
    },
    {
        "id": "double-decker-napkin",
        "name": "Double Decker Paper Napkin Machine",
        "model": "FLY_1200",
        "description": "Designed for high-speed production and maximum efficiency. Ideal for scaling up manufacturing.",
        "features": ["1200 Sheets/Min", "Single Color Printing", "Double Decker Design", "High Production"],
        "image": "/input_file_7.png"
    },
    {
        "id": "semi-auto-toilet-roll",
        "name": "Semi-Automatic Toilet Roll Machine",
        "model": "FLY_800",
        "description": "Cost-effective solution for producing high-quality toilet rolls with ease.",
        "features": ["8000 Rolls / 8 Hrs", "800mm Working Width", "PLC Controller", "Low Investment"],
        "image": "/input_file_9.png"
    },
    {
        "id": "fully-auto-toilet-roll",
        "name": "Fully Automatic Toilet Roll Machine",
        "model": "FLY_1450",
        "description": "State-of-the-art solution for high-speed, precise, and efficient toilet roll production.",
        "features": ["15000 Rolls / 8 Hrs", "Automatic Core Loading", "Tail Sealing", "High Production"],
        "image": "/input_file_11.png"
    },
    {
        "id": "l-fold-dispenser",
        "name": "L-Fold Cube Napkin Dispenser Machine",
        "model": "FLY_-650",
        "description": "Precision production of cube napkins, delivering up to 600 tissues per minute.",
        "features": ["600 Tissues/Min", "Manual Sealing Attachment", "Perfect Folding", "High Demand"],
        "image": "/input_file_15.png"
    },
    {
        "id": "foil-rewinding",
        "name": "Aluminum Foil Rewinding Machine",
        "description": "High-performance solution for precise rewinding of industrial stretch films and foil.",
        "features": ["Precise Rewinding", "User-friendly Controls", "Continuous Production", "Speed & Accuracy"],
        "image": "/input_file_17.png"
    },
    {
        "id": "three-color-flexo",
        "name": "Three Colour Flexo Printing Paper Napkin Machine",
        "description": "Advanced flexographic printing technology with a double embossing system for premium quality napkins.",
        "features": ["3 Color Printing", "Double Embossing", "High-speed Production", "Unmatched Consistency"],
        "image": "/input_file_13.png"
    },
    {
        "id": "automatic-sealing",
        "name": "Fully Automatic Sealing Machine",
        "description": "Hygienic packing solutions for paper napkins of different sizes and designs.",
        "features": ["Fast & Precise", "Advanced Sealing Tech", "Hygienic Packing", "Market Ready"],
        "image": "/input_file_18.png"
    }
]

@app.route('/')
def index():
    return render_template('index.html', products=PRODUCTS)

@app.route('/product/<product_id>')
def product_detail(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return "Product Not Found", 404
    return render_template('product.html', product=product)

@app.route('/api/products')
def get_products():
    return jsonify(PRODUCTS)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    print(f"Contact Form: {data}")
    return jsonify({"success": True, "message": "Thank you for contacting us."})

@app.route('/api/quote', methods=['POST'])
def quote():
    data = request.json
    print(f"Quote Request: {data}")
    return jsonify({"success": True, "message": "Quote request received."})

# Serve images and SEO files from root/public for compatibility
@app.route('/<path:filename>')
def serve_static(filename):
    # Check if file exists in root
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    # Check if file exists in public (for robots.txt, sitemap.xml)
    if os.path.exists(os.path.join('public', filename)):
        return send_from_directory('public', filename)
    return "Not Found", 404

if __name__ == '__main__':
    # Run on port 3000 for the preview environment
    app.run(host='0.0.0.0', port=3000, debug=True)
