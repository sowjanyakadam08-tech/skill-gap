import glob

for f in glob.glob('js/*.js'):
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
        print(f"Verified {f}: {len(text)} bytes, {len(text.splitlines())} lines.")
