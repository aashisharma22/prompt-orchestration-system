import yaml
import json


def is_valid(entry):
    if "prompt" not in entry:
        return False, "missing 'prompt'"
    if "expected_behavior" not in entry:
        return False, "missing 'expected_behavior'"
    if "category" not in entry:
        return False, "missing 'category'"

    if not entry["prompt"].strip():
        return False, "empty 'prompt'"

    return True, ""


def main():
    with open("tests.yaml", "r") as f:
        data = yaml.safe_load(f)

    tests = data.get("tests", [])

    grouped = {}
    total = len(tests)
    count_valid = 0
    count_skipped = 0

    for i, entry in enumerate(tests):
        valid, reason = is_valid(entry)

        if not valid:
            print(f"Skipping entry {i}: {reason}")
            count_skipped += 1
            continue

        count_valid += 1

        category = entry["category"]

        if category not in grouped:
            grouped[category] = []

        grouped[category].append({
            "prompt": entry["prompt"],
            "expected_behavior": entry["expected_behavior"]
        })

    with open("parsed_tests.json", "w") as f:
        json.dump(grouped, f, indent=2)

    print("\nSummary:")
    print(f"Total Prompts: {total}")
    print(f"Valid Prompts: {count_valid}")
    print(f"Skipped Prompts: {count_skipped}")


if __name__ == "__main__":
    main()