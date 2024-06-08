import torch
import transformers
from time import time
from IPython.display import display, Markdown


model = "/kaggle/input/llama-3/transformers/8b-chat-hf/1"

pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    torch_dtype=torch.float16,
    device_map="auto",
)


job_description = (input("Enter Job Description : "))
prompt = f"For the following job description: {job_description} ask the user a question and grade each reply on how accurate the information is on a scale of 1-10, if the user isn't able to answer properly ask further questions"
input_message = [{"role": "user", "content": prompt}]
response = pipeline(
    input_message,
    max_new_tokens=256,
    eos_token_id=pipeline.tokenizer.eos_token_id,
    do_sample=True,
    temperature=0.7,
    top_p=0.9,
)
print(response)