# Notification System Design

## Stage 1 Design Overview

The notification engine prioritizes incoming campus notifications based on:
- Notification category importance
- Timestamp recency

Priority Order:
1. Placement
2. Result
3. Event

A heap-based ranking strategy was selected to efficiently maintain the highest priority notifications while handling continuously incoming data streams.

### Benefits
- Faster top-k extraction
- Better scalability
- Suitable for real-time feeds

---

## Stage 2 Frontend Overview

A responsive dashboard was implemented using React.js and Material UI.

### Features
- Notification filtering
- Dynamic notification limit
- Viewed/unviewed distinction
- Responsive layout
- Live API integration
- Loading indicators

### UI Strategy
The interface was intentionally designed with clean spacing and clear visual hierarchy to reduce notification overload for users.