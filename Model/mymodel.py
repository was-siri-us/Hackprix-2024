from transformers import AutoTokenizer, pipeline
import torch

model = "meta-llama/Llama-2-7b-chat-hf"  # Example model name, replace with actual model path

tokenizer = AutoTokenizer.from_pretrained(model, use_auth_token=True)

llama_pipeline = pipeline(
    "text-generation",  # LLM task
    model=model,
    torch_dtype=torch.float16,
    device_map="auto",
)

SYSTEM_PROMPT = """<s>[INST] <<SYS>>
You are a helpful interview simulator. You ask relevant interview questions based on the job description and the candidate's previous answers. 
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
    # Always keep len(history) <= memory_limit
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

    return response.strip()

# Main function to run the interview simulator
    def start_interview():
        history = []
        job_description = input("Enter the job description for the position you are applying to: ")

        initial_question = get_llama_response(f"Generate an interview question for the following job description: {job_description}", history)
        print(f"\nInitial Question: {initial_question}")
        history.append((f"Generate an interview question for the following job description: {job_description}", initial_question))

        while True:
            answer = input("\nYour Answer: ")
            history.append((answer, ""))  # Placeholder for model's response

            follow_up_question = get_llama_response(f"Generate a follow-up interview question based on this answer: {answer}", history)
            print(f"\nFollow-up Question: {follow_up_question}")
            history[-1] = (answer, follow_up_question)

            continue_interview = input("Do you want to answer another question? (yes/no): ").strip().lower()
            if continue_interview != 'yes':
                print("Interview simulation ended.")
                break

if __name__ == "__main__":
    start_interview()
