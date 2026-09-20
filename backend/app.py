from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Eric Xu Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROFILE = {
    "name": "Eric Xu",
    "age": 14,
    "tagline": "Student | Debate & MUN | Vintage Watches | Entrepreneurship",
    "intro": (
        "Grade 8 student at Benjamin Franklin International School in Barcelona. "
        "I care about entrepreneurship, mechanical watches, debate, and international affairs — "
        "and I make art when I want to slow down and look closer."
    ),
    "about": [
        "I buy and resell vintage watches through Wallapop and flea markets, learning pricing, sourcing, sales, and basic inventory along the way.",
        "Debate and MUN keep me sharp: I am an executive member and speak in conferences and public forums.",
        "Outside school I play flute, follow classical, rock, and modern jazz, and I am building content ideas around watches, vintage culture, student life, and Barcelona.",
    ],
    "facts": [
        {"label": "School", "value": "BFIS, Barcelona"},
        {"label": "Programme", "value": "IB MYP · Grade 8"},
        {"label": "Focus", "value": "Watches & debate"},
        {"label": "Languages", "value": "EN · ZH · ES"},
    ],
    "education": {
        "school": "Benjamin Franklin International School (BFIS), Barcelona",
        "programme": "IB Middle Years Programme — Grade 8",
    },
    "activities": [
        {
            "title": "Debate & MUN",
            "detail": "Executive member; debates, MUN conferences, and public speaking.",
        },
        {
            "title": "Vintage Watches",
            "detail": "Mechanical movements, watch history, vintage Seiko, Swiss watches, and pocket watches.",
        },
        {
            "title": "Entrepreneurship",
            "detail": "Buys and resells vintage watches on Wallapop and at flea markets — pricing, sourcing, sales, inventory.",
        },
        {
            "title": "Music",
            "detail": "Flute player; classical, rock, and modern jazz.",
        },
        {
            "title": "Content Creation",
            "detail": "Ideas around watches, vintage culture, student life, and Barcelona.",
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
}

ARTWORKS = [
    {
        "id": "colorful-chicken",
        "title": "Colorful Chicken",
        "year": 2025,
        "medium": "Charcoal and pigment",
        "size": "Studio sheet",
        "note": (
            "A portrait of a chicken built with colorful charcoal and pigment. "
            "I pushed saturated marks over dark structure so the bird feels alive, not flat."
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
            "An oil study of a melon — weight, rind texture, and the quiet shine of fruit on a table."
        ),
        "accent": "#6b8f3a",
        "wash": "#d8c4a8",
        "image": "/artworks/picture2.jpg",
    },
    {
        "id": "chicken-sketch",
        "title": "Chicken Sketch",
        "year": 2025,
        "medium": "Sketch",
        "size": "Sketchbook",
        "note": (
            "A second chicken, this time as a line sketch — faster and looser, chasing gesture instead of color."
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
        "size": "A4",
        "note": (
            "A watercolor of a street in Paris — wet washes for stone, sky, and the soft edges of a city that already feels like memory."
        ),
        "accent": "#7d8b96",
        "wash": "#c4a574",
        "image": "/artworks/picture4.jpg",
    },
]

WATCHES = [
    {
        "id": "vintage-seiko",
        "name": "Vintage Seiko",
        "year_acquired": 2025,
        "movement": "Automatic / mechanical",
        "note": "I research Seiko history and movements, then hunt for pieces worth wearing and learning from.",
        "origin": "Japan",
    },
    {
        "id": "swiss-find",
        "name": "Swiss vintage find",
        "year_acquired": 2025,
        "movement": "Mechanical",
        "note": "Sourced through marketplaces and flea markets — pricing and condition decide everything.",
        "origin": "Switzerland",
    },
    {
        "id": "pocket-watch",
        "name": "Pocket watch study",
        "year_acquired": 2026,
        "movement": "Manual wind",
        "note": "Pocket watches taught me how older movements feel in the hand before I buy or resell.",
        "origin": "Various",
    },
    {
        "id": "wallapop-flip",
        "name": "Marketplace piece",
        "year_acquired": 2025,
        "movement": "Varies",
        "note": "Bought to resell on Wallapop — inventory, photos, and honest descriptions matter as much as the watch.",
        "origin": "Barcelona flea / online",
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
