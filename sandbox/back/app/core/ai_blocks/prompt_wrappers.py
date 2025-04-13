
# 🔹 OpenAI API Key (⚠️ Replace with secure retrieval method)
# OPENAI_API_KEY = CONFIG["openai"]["api_key"]

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "sk-REPLACE_ME")


# %%
import json
import openai


client = openai.AsyncOpenAI(api_key=OPENAI_API_KEY)


async def ai_coder_see_script(code: str, model="gpt-4o-mini", **kwargs):
    prompt = kwargs.pop("prompt", "Please review the following:")  # ✅ FIX here
    system = "You're a senior engineer reviewing code."

    return await client.chat.completions.create(
        model=model,
        temperature=0.3,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": f"{prompt}\n\n{code}"}
        ],
        **kwargs  # ✅ now prompt is not inside this
    )

# # Add more as needed
# async def ai_architect_see_script(...): ...
# ...

import asyncio

async def query_openai(snippets, prompt_wrapper, **kwargs):
    tasks = [prompt_wrapper(snippet, **kwargs) for snippet in snippets]
    return await asyncio.gather(*tasks)



# Dispatcher
PROMPT_WRAPPERS = {
    "code_review": ai_coder_see_script,
    # "architecture": ai_architect_see_script,
}
