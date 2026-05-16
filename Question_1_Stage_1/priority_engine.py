import requests
from heapq import heappush, heappop

API_URL = "http://4.224.186.213/evaluation-service/notifications"

priority_order = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
}

dummy_notifications = [
    {
        "ID": "1",
        "Type": "Placement",
        "Message": "Microsoft Hiring Drive",
        "Timestamp": "2026-05-16 15:20"
    },
    {
        "ID": "2",
        "Type": "Result",
        "Message": "Semester Results Published",
        "Timestamp": "2026-05-16 15:18"
    },
    {
        "ID": "3",
        "Type": "Event",
        "Message": "Hackathon Registration Open",
        "Timestamp": "2026-05-16 15:10"
    },
    {
        "ID": "4",
        "Type": "Placement",
        "Message": "Amazon Internship Opportunity",
        "Timestamp": "2026-05-16 15:05"
    }
]

try:

    response = requests.get(API_URL)

    if response.status_code == 200 and "notifications" in response.json():

        notifications = response.json()["notifications"]

    else:

        notifications = dummy_notifications

except:

    notifications = dummy_notifications

heap = []

for item in notifications:

    score = priority_order.get(item["Type"], 0)

    heappush(
        heap,
        (
            -score,
            item["Timestamp"],
            item
        )
    )

priority_feed = []

while heap and len(priority_feed) < 10:

    priority_feed.append(heappop(heap)[2])

print("\nPriority Notification Feed\n")

for index, item in enumerate(priority_feed, start=1):

    print(
        f"{index}. "
        f"{item['Type']} | "
        f"{item['Message']} | "
        f"{item['Timestamp']}"
    )