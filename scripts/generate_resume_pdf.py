from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

OUT = "/home/claude/muizz-portfolio/public/resume.pdf"

styles = getSampleStyleSheet()
dark = HexColor("#10151d")
muted = HexColor("#5b6472")
accent = HexColor("#0c9c88")

name_style = ParagraphStyle("Name", parent=styles["Title"], alignment=TA_LEFT,
                            fontName="Helvetica-Bold", fontSize=22, textColor=dark, spaceAfter=2)
title_style = ParagraphStyle("TitleSub", parent=styles["Normal"], fontSize=11,
                              textColor=muted, spaceAfter=10)
contact_style = ParagraphStyle("Contact", parent=styles["Normal"], fontSize=9.5,
                                 textColor=muted, spaceAfter=14)
section_style = ParagraphStyle("Section", parent=styles["Heading2"], fontSize=11,
                                 textColor=accent, spaceBefore=14, spaceAfter=6,
                                 fontName="Helvetica-Bold")
role_style = ParagraphStyle("Role", parent=styles["Normal"], fontSize=10.5,
                              textColor=dark, fontName="Helvetica-Bold", spaceAfter=1)
meta_style = ParagraphStyle("Meta", parent=styles["Normal"], fontSize=9,
                              textColor=muted, spaceAfter=4)
body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=9.5,
                              textColor=dark, leading=14, spaceAfter=8)
bullet_style = ParagraphStyle("Bullet", parent=styles["Normal"], fontSize=9.5,
                                textColor=dark, leading=13.5, leftIndent=12, spaceAfter=3)

doc = SimpleDocTemplate(OUT, pagesize=LETTER,
                         topMargin=0.6 * inch, bottomMargin=0.6 * inch,
                         leftMargin=0.7 * inch, rightMargin=0.7 * inch)

story = []

story.append(Paragraph("Muizzuddin Thaqif Ramlee", name_style))
story.append(Paragraph("Software Engineer — Integration &amp; Delivery · Backend · APIs · Cloud &amp; Kubernetes", title_style))
story.append(Paragraph(
    "Kuala Lumpur, Malaysia &nbsp;·&nbsp; [Add real email here] &nbsp;·&nbsp; "
    "[Add real LinkedIn URL here] &nbsp;·&nbsp; [Add real GitHub URL here]",
    contact_style))
story.append(HRFlowable(width="100%", thickness=0.75, color=HexColor("#e2e5eb")))

story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
story.append(Paragraph(
    "Software engineer working on the systems that sit between applications rather than the ones "
    "people click on directly &mdash; integration middleware, API mapping, and the backend plumbing "
    "that keeps a core banking platform talking to everything around it.", body_style))

story.append(Paragraph("EXPERIENCE", section_style))

story.append(Paragraph("Software Engineer, Project Delivery &amp; Integration &mdash; Silverlake", role_style))
story.append(Paragraph("Kuala Lumpur, Malaysia &nbsp;·&nbsp; 2024 &ndash; Present", meta_style))
for point in [
    "Configure and debug API data mappings translating JSON payloads between a core banking host and external channel/partner systems.",
    "Perform gap analysis between payload structures and mapping specifications; raise and track change/incident requests with the platform vendor.",
    "Diagnose integration defects spanning mapping configuration, field-processing scripts, and date/format handling.",
    "Work within Kubernetes-based deployment environments to reproduce and validate fixes across DEV, SIT and UAT.",
]:
    story.append(Paragraph(f"&bull; {point}", bullet_style))

story.append(Spacer(1, 8))
story.append(Paragraph("Frontend Intern &mdash; NexMind", role_style))
story.append(Paragraph("2023", meta_style))
for point in [
    "Built frontend features for the Text2Social project using Vue.js.",
    "Integrated OAuth-based SDK authentication flows for connecting third-party social accounts.",
]:
    story.append(Paragraph(f"&bull; {point}", bullet_style))

story.append(Paragraph("EDUCATION", section_style))
story.append(Paragraph("Bachelor of Software Engineering", role_style))
story.append(Paragraph("Universiti Kebangsaan Malaysia (UKM) &nbsp;·&nbsp; CGPA 3.47", meta_style))

story.append(Paragraph("TECHNICAL SKILLS", section_style))
skills = [
    ("Programming", "Java, TypeScript, JavaScript, SQL, Lua, Go (learning)"),
    ("Backend", "Spring Boot, REST APIs, API Integration &amp; Mapping, Kafka, Node.js"),
    ("Cloud / Infrastructure", "Kubernetes, Docker, Helm, Linux"),
    ("Database", "MySQL, TiDB, MariaDB, Liquibase"),
    ("Tools", "Git, GitLab, Postman, DBeaver, VS Code"),
]
for label, value in skills:
    story.append(Paragraph(f"<b>{label}:</b> {value}", body_style))

story.append(Paragraph("PROJECTS", section_style))
for title, desc in [
    ("Core Banking Integration Middleware (Case Study)",
     "Configuring and debugging the mapping layer between a core banking platform and its channel systems."),
    ("Kubernetes Home Lab",
     "Self-hosted Minikube cluster used to learn Deployments, Services, ConfigMaps, Ingress and PV/PVC hands-on."),
]:
    story.append(Paragraph(f"<b>{title}</b> &mdash; {desc}", body_style))

story.append(Paragraph("ACHIEVEMENTS", section_style))
story.append(Paragraph("[Add achievements or awards here as they come up.]", body_style))

doc.build(story)
print("wrote", OUT)
