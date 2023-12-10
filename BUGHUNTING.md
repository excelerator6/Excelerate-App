<!-- ** SERVER CRASHING ERROR NOTES ** -->

    - It definitely seems to be something with the achievements route on the server. I (Anders)
        commented the call to the achievements saga in the activities saga out, effectively cutting the achievements out of the loop, and got +10 entries in without the server crashing. 