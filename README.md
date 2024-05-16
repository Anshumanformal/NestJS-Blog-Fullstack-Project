# NestJS-Project
NestJS Project - User Blog app


# Scripts

1. cd blog-frontend/ && npm run start
2. cd blog-backend/ && npm run start:dev

# Agenda

Phase 1:

1. User CRUD
2. Blog CRUD
3. All users can preview all blog posts. After few characters, blog details are hidden - done
4. Upon clicking on a blog, 
    Show :-
    1. Blog creator info - done
    2. Blog content - done
    3. date & time of the blog - done

Phase 2:
1. User authentication - User must be logged in to create/ update/ delete the blog - done

# Bugs

P0 :
1. Blog author field should contain author name and should autopopulate from logged in user credentials.
2. After token expires, remove it from the localStorage as well.
3. Add a "Hi, ${username}" tag when the user is logged in, in all pages.

P1 :
1. Apply Backend Guard / Authorization also to prevent any user from creating / updating a post without been logged in.
2. Try working on a logic, to show a logout modal popup, like in SignIn.jsx, and remove the component for Signout.jsx. See if it works. Also, handle server-side token expiration as well.
3. Try manual expiration of token from Backend.
    -> 1st method - Automatic expiration using expiresIn key.
    -> 2nd method - blacklist the token by hitting a logout route.


-> Old background-color: #282c34;
