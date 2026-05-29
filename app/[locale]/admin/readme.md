Alterar a rule de feedback:

de:
allow read: if false;

para:
allow read: if request.auth != null && request.auth.uid == "UID";