<!-- ** SERVER CRASHING ERROR NOTES ** -->

    - It definitely seems to be something with the achievements route on the server. I (Anders)
        commented the call to the achievements saga in the activities saga out, effectively cutting the achievements out of the loop, and got +10 entries in without the server crashing. 

    - Something is janky with the achievements anyway, they aren't properly calculating. It says I've achieved multiple of the XP achievements, and I've gotten nowhere near that amount of XP.

    - So I haven't cleanly cut off the achievements router just yet. Somehow, the achievements/ is still getting hit.