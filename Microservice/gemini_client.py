import os
from google.genai import Client, types

def query_gemini(prompt: str, model_name: str = "gemini-1.5-flash", max_tokens: int = 300):
    client = Client(api_key=os.getenv("GOOGLE_API_KEY"))

    generation_config = types.GenerateContentConfig(
        max_output_tokens=max_tokens
    )

    # Try the preferred model first; fall back to a known-supported model if necessary
    try:
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=generation_config
        )
        return response.text.strip()

    except Exception as primary_exc:
        # Fallback model (more widely supported for generate-like endpoints)
        fallback_model = "text-bison-001"
        try:
            response = client.models.generate_content(
                model=fallback_model,
                contents=prompt,
                config=generation_config
            )
            return response.text.strip()

        except Exception as fallback_exc:
            raise Exception(f"Gemini API Error: primary: {primary_exc}; fallback: {fallback_exc}")