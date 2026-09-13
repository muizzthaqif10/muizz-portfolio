from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "resume.pdf"

styles = getSampleStyleSheet()
dark = HexColor("#10151d")
muted = HexColor("#5b6472")
accent = HexColor("#0c9c88")

name_style = ParagraphStyle(
    "Name",
    parent=styles["Title"],
    alignment=TA_LEFT,
    fontName="Helvetica-Bold",
    fontSize=22,
    textColor=dark,
    spaceAfter=2,
)
title_style = ParagraphStyle(
    "TitleSub",
    parent=styles["Normal"],
    fontSize=11,
    textColor=muted,
    spaceAfter=10,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontSize=9.5,
    textColor=muted,
    spaceAfter=14,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontSize=11,
    textColor=accent,
    spaceBefore=14,
    spaceAfter=6,
    fontName="Helvetica-Bold",
)
role_style = ParagraphStyle(
    "Role",
    parent=styles["Normal"],
    fontSize=10.5,
    textColor=dark,
    fontName="Helvetica-Bold",
    spaceAfter=1,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=styles["Normal"],
    fontSize=9,
    textColor=muted,
    spaceAfter=4,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontSize=9.5,
    textColor=dark,
    leading=14,
    spaceAfter=8,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=styles["Normal"],
    fontSize=9.5,
    textColor=dark,
    leading=13.5,
    leftIndent=12,
    spaceAfter=3,
)

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=LETTER,
    topMargin=0.6 * inch,
    bottomMargin=0.6 * inch,
    leftMargin=0.7 * inch,
    rightMargin=0.7 * inch,
)

story = []

story.append(Paragraph("Muizzuddin Thaqif Ramlee", name_style))
story.append(
    Paragraph(
        "Software Engineer — Integration &amp; Delivery · Backend · APIs · Cloud &amp; Kubernetes",
        title_style,
    )
)
story.append(
    Paragraph(
        "Kuala Lumpur, Malaysia &nbsp;·&nbsp; muizz.thaqif@gmail.com &nbsp;·&nbsp; "
        "https://www.linkedin.com/in/muizzuddin-thaqif-ramlee/ &nbsp;·&nbsp; "
        "https://github.com/muizzthaqif10",
        contact_style,
    )
)
story.append(HRFlowable(width="100%", thickness=0.75, color=HexColor("#e2e5eb")))

story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
story.append(
    Paragraph(
        "Software engineer working on the systems that sit between applications rather than the ones people click on directly — integration middleware, API mapping, and the backend plumbing that keeps a core banking platform talking to everything around it.",
        body_style,
    )
)

story.append(Paragraph("EXPERIENCE", section_style))
story.append(
    Paragraph(
        "Software Engineer, Project Delivery &amp; Integration &mdash; Silverlake",
        role_style,
    )
)
story.append(Paragraph("Kuala Lumpur, Malaysia &nbsp;·&nbsp; 2024 &ndash; Present", meta_style))
for point in [
    "Configure and debug API data mappings translating JSON payloads between a core banking host and external channel and partner systems across multiple transaction types.",
    "Perform gap analysis between payload structures and mapping specifications, and raise or track change and incident requests with the platform vendor when the issue traces back to the engine itself.",
    "Diagnose defects spanning mapping configuration, field-processing scripts, and date or format handling, including empty-value ambiguity and multi-pass mapping overwrite issues.",
    "Work in Kubernetes-based deployment environments to inspect pod configuration and logs, reproduce environment-specific defects, and validate fixes across DEV, SIT and UAT.",
    "Use Liquibase-based snapshot diffing and release-tracking workbooks to coordinate change promotion and environment readiness across multiple release cycles.",
]:
    story.append(Paragraph(f"&bull; {point}", bullet_style))

story.append(Spacer(1, 8))
story.append(Paragraph("Frontend Intern &mdash; NexMind", role_style))
story.append(Paragraph("2023", meta_style))
for point in [
    "Contributed to Text2Social using Vue.js, enabling clients to generate engaging social media captions to strengthen their online presence.",
    "Collaborated with backend developers to design and implement authentication flows for Facebook, Instagram, LinkedIn, and Twitter integrations.",
    "Integrated secure authentication mechanisms using the LinkedIn API, Facebook SDK, and Twitter API to manage user access tokens and enable automated posting of generated content.",
    "Assisted with debugging, troubleshooting, and resolving platform issues to improve the stability and performance of the NexMind AI platform.",
]:
    story.append(Paragraph(f"&bull; {point}", bullet_style))

story.append(Paragraph("EDUCATION", section_style))
story.append(Paragraph("Bachelor of Software Engineering", role_style))
story.append(Paragraph("Universiti Kebangsaan Malaysia (UKM) &nbsp;·&nbsp; CGPA 3.5", meta_style))
story.append(Paragraph("Foundation in Pure Science &mdash; Pusat Genius Pintar UKM &nbsp;·&nbsp; Jun 2019 &ndash; Jun 2020 &nbsp;·&nbsp; Grade 3.5", meta_style))
story.append(Paragraph("Secondary School &mdash; Sekolah Menengah Sains Lahad Datu, Sabah &nbsp;·&nbsp; SPM 9A", meta_style))

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
    (
        "Core Banking Integration Middleware (Case Study)",
        "Configuring and debugging the mapping layer between a core banking platform and its surrounding channel systems.",
    ),
    (
        "Kubernetes Home Lab",
        "Self-hosted Minikube cluster used to learn Deployments, Services, ConfigMaps, Ingress and PV/PVC hands-on.",
    ),
]:
    story.append(Paragraph(f"<b>{title}</b> &mdash; {desc}", body_style))

story.append(Paragraph("CURRENT FOCUS", section_style))
story.append(
    Paragraph(
        "Deepening backend fundamentals in Go and Kubernetes, with emphasis on distributed systems, system design, and production-ready deployment patterns.",
        body_style,
    )
)

doc.build(story)
print("wrote", OUT)
