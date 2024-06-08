# !pip install transformers torch accelerate


# !huggingface-cli login --token "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"


from transformers import AutoTokenizer
import transformers
import torch

model = "meta-llama/Llama-2-7b-chat-hf" # meta-llama/Llama-2-7b-chat-hf

tokenizer = AutoTokenizer.from_pretrained(model, use_auth_token=True)


from transformers import pipeline

llama_pipeline = pipeline(
    "text-generation",  # LLM task
    model=model,
    torch_dtype=torch.float16,
    device_map="auto",
)



SYSTEM_PROMPT = """<s>[INST] <<SYS>>
You are a helpful medical chatbot, you suggest basic remedies for the query from user and suggest a suitable specialization of a Doctor for that problem, keep the response under 50 words. You should not mention any names of doctors in your response, prefer only specifying the specialization
<</SYS>>

"""

# Formatting function for message and history
def format_message(message: str, history: list, memory_limit: int = 3) -> str:
    """
    Formats the message and history for the Llama model.

    Parameters:
        message (str): Current message to send.
        history (list): Past conversation history.
        memory_limit (int): Limit on how many past interactions to consider.

    Returns:
        str: Formatted message string
    """
    # always keep len(history) <= memory_limit
    if len(history) > memory_limit:
        history = history[-memory_limit:]

    if len(history) == 0:
        return SYSTEM_PROMPT + f"{message} [/INST]"

    formatted_message = SYSTEM_PROMPT + f"{history[0][0]} [/INST] {history[0][1]} </s>"

    # Handle conversation history
    for user_msg, model_answer in history[1:]:
        formatted_message += f"<s>[INST] {user_msg} [/INST] {model_answer} </s>"

    # Handle the current message
    formatted_message += f"<s>[INST] {message} [/INST]"

    return formatted_message


# Generate a response from the Llama model
def get_llama_response(message: str, history: list) -> str:
    """
    Generates a conversational response from the Llama model.

    Parameters:
        message (str): User's input message.
        history (list): Past conversation history.

    Returns:
        str: Generated response from the Llama model.
    """
    query = format_message(message, history)
    response = ""

    sequences = llama_pipeline(
        query,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
        max_length=1024,
    )

    generated_text = sequences[0]['generated_text']
    response = generated_text[len(query):]  # Remove the prompt from the output

    print("Chatbot:", response.strip())
    return response.strip()