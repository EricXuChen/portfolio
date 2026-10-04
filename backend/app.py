from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Eric Xu Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.50:3000",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROFILE = {
    "name": "Eric Xu",
    "age": 14,
    "tagline": "Student · Debate & MUN · Vintage Watches · Entrepreneurship",
    "intro": (
        "Grade 8 student at Benjamin Franklin International School in Barcelona. "
        "I build small businesses around vintage watches, speak in debate and MUN, "
        "and make art when I want to slow down and really look."
    ),
    "about": [
        "In Barcelona I source vintage watches at flea markets and on Wallapop, then research the movement, price the piece, photograph it, and resell it. That loop taught me negotiation, inventory, and how condition changes value.",
        "Debate and Model United Nations keep the other half of my brain sharp. As an executive member I prepare arguments, listen across cultures, and speak in conferences and public forums.",
        "Outside school I play flute — classical, rock, and modern jazz — and I am shaping content ideas around watches, vintage culture, student life between languages, and the city I live in.",
    ],
    "facts": [
        {"label": "School", "value": "BFIS, Barcelona"},
        {"label": "Programme", "value": "IB MYP · Grade 8"},
        {"label": "Focus", "value": "Watches & debate"},
        {"label": "Languages", "value": "English · Chinese · Spanish"},
    ],
    "education": {
        "school": "Benjamin Franklin International School (BFIS), Barcelona",
        "programme": "IB Middle Years Programme — Grade 8",
        "description": (
            "An international middle-school path that mixes inquiry, languages, and "
            "projects. Barcelona is my classroom beyond the campus — markets, museums, "
            "and conversations in three languages."
        ),
    },
    "activities": [
        {
            "title": "Debate & MUN",
            "detail": (
                "Executive member. I research topics, write position papers, and speak "
                "in debates and Model United Nations conferences — practicing calm under pressure."
            ),
        },
        {
            "title": "Vintage Watches",
            "detail": (
                "I study mechanical movements and watch history, with a soft spot for "
                "vintage Seiko, Swiss pieces, and pocket watches you can still wind by hand."
            ),
        },
        {
            "title": "Entrepreneurship",
            "detail": (
                "I buy and resell vintage watches through Wallapop and flea markets: "
                "sourcing, pricing, sales photos, honest descriptions, and simple inventory tracking."
            ),
        },
        {
            "title": "Music",
            "detail": (
                "Flute player. I listen across classical, rock, and modern jazz — "
                "the same attention to tone and timing I bring to drawing and watchmaking details."
            ),
        },
        {
            "title": "Content Creation",
            "detail": (
                "Developing short-form ideas on watches, vintage culture, student life, "
                "and Barcelona — translating what I learn into stories other students can follow."
            ),
        },
    ],
    "skills": [
        "Public speaking and argumentation",
        "Research and analysis",
        "Negotiation and sales",
        "Entrepreneurship",
        "Cross-cultural communication",
        "English, Chinese, and Spanish",
    ],
    "sections": {
        "catalogue": (
            "A quick snapshot of where I study, what I focus on, and the languages "
            "I use every day in Barcelona."
        ),
        "about": (
            "Who I am beyond a resume line — how watches, debate, and art fit together "
            "in one student life."
        ),
        "education": (
            "Where I learn formally, and how the IB Middle Years Programme shapes "
            "the way I research and present ideas."
        ),
        "activities": (
            "The clubs, crafts, and side projects that take most of my free time — "
            "each one teaches a different kind of attention."
        ),
        "skills": (
            "Practical strengths I use in debate rooms, flea markets, classrooms, "
            "and when talking across English, Chinese, and Spanish."
        ),
        "selected_work": (
            "Four recent studio pieces — charcoal, oil, sketch, and watercolor — "
            "chosen to show different materials and moods."
        ),
        "watches": (
            "A working collection and study list: pieces I wear, research, or pass "
            "through my small resale practice in Barcelona."
        ),
        "gallery": (
            "Open any work for the full image, medium, and process notes. "
            "These are originals from my sketchbooks and studio table."
        ),
        "watches_page": (
            "Not a vault — a small, active set of mechanical and vintage watches. "
            "Each entry notes why it matters for learning, wearing, or resale."
        ),
    },
}

ARTWORKS = [
    {
        "id": "colorful-chicken",
        "title": "Colorful Chicken",
        "year": 2025,
        "medium": "Colorful charcoal and pigment",
        "size": "Studio sheet",
        "note": (
            "A portrait of a chicken built with colorful charcoal and pigment. "
            "I blocked in the dark structure first, then dragged saturated color over it "
            "so feathers and comb feel loud and alive instead of flat."
        ),
        "accent": "#c45c2c",
        "wash": "#1c2740",
        "image": "/artworks/picture1.jpg",
    },
    {
        "id": "oil-melon",
        "title": "Oil Melon",
        "year": 2025,
        "medium": "Oil paint",
        "size": "Studio panel",
        "note": (
            "An oil study of a melon on a quiet table. I cared about weight, the rough rind, "
            "and how a thin highlight can make fruit look heavy and edible at the same time."
        ),
        "accent": "#6b8f3a",
        "wash": "#d8c4a8",
        "image": "/artworks/picture2.jpg",
    },
    {
        "id": "chicken-sketch",
        "title": "Chicken Sketch",
        "year": 2025,
        "medium": "Graphite / ink sketch",
        "size": "Sketchbook page",
        "note": (
            "A second chicken, drawn faster and looser. This one is about gesture and silhouette — "
            "the opposite of the charcoal portrait, where color did most of the talking."
        ),
        "accent": "#111111",
        "wash": "#e8ddd0",
        "image": "/artworks/picture3.jpg",
    },
    {
        "id": "paris-street",
        "title": "Paris Street",
        "year": 2025,
        "medium": "Watercolor",
        "size": "A4 paper",
        "note": (
            "A watercolor street in Paris. Wet-into-wet washes built the stone and sky; "
            "edges stayed soft on purpose so the city feels like a memory you walk through, not a postcard."
        ),
        "accent": "#7d8b96",
        "wash": "#c4a574",
        "image": "/artworks/picture4.jpg",
    },
]

WATCHES = [
    {
        "id": "vintage-seiko",
        "name": "Vintage Seiko (study piece)",
        "year_acquired": 2025,
        "movement": "Automatic / mechanical",
        "note": (
            "My doorway into Japanese mechanical watches. I research Seiko history and "
            "movement families before buying, then wear the piece to learn how it feels day to day."
        ),
        "origin": "Japan",
    },
    {
        "id": "swiss-find",
        "name": "Swiss vintage find",
        "year_acquired": 2025,
        "movement": "Mechanical",
        "note": (
            "Sourced through marketplaces and flea markets. Condition, service history, and "
            "honest pricing decide whether it stays in my drawer or goes back on Wallapop."
        ),
        "origin": "Switzerland",
    },
    {
        "id": "pocket-watch",
        "name": "Pocket watch study",
        "year_acquired": 2026,
        "movement": "Manual wind",
        "note": (
            "Pocket watches taught me older winding habits and case construction. "
            "I wind it by hand and compare the feel to modern wrist watches before I buy or resell."
        ),
        "origin": "Various",
    },
    {
        "id": "wallapop-flip",
        "name": "Marketplace turnover piece",
        "year_acquired": 2025,
        "movement": "Varies by lot",
        "note": (
            "Bought to practice the full resale loop: inspect, clean, photograph, write a clear "
            "listing, price it, and track what sells in Barcelona’s online and flea market scene."
        ),
        "origin": "Barcelona flea / Wallapop",
    },
]


@app.get("/api/health")
def health():
    return {"ok": True}


@app.get("/api/profile")
def profile():
    return PROFILE


@app.get("/api/artworks")
def artworks():
    return ARTWORKS


@app.get("/api/artworks/{artwork_id}")
def artwork(artwork_id: str):
    for work in ARTWORKS:
        if work["id"] == artwork_id:
            return work
    raise HTTPException(status_code=404, detail="Artwork not found")


@app.get("/api/watches")
def watches():
    return WATCHES
