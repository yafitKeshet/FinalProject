from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

# Define the content with HTML tags


html_content = None

with open('../bla.html') as f:
    html_content = f.read()

import pdfkit


pdfkit.from_string(html_content, 'output.pdf')