# NestJS-Project
NestJS FullStack Project - User Blog app

1. ReactJS Frontend production repo - https://github.com/Anshumanformal/Blog-fullstack-app-ReactJS-and-NestJS-frontend
2. NestJS Backend production repo - https://github.com/Anshumanformal/Blog-fullstack-app-ReactJS-and-NestJS-backend

# Live URLs
1. ReactJS Frontend live URL - https://anshumanformal.github.io/Blog-fullstack-app-ReactJS-and-NestJS-frontend/#/home
2. NestJS Backend live URL - https://blog-fullstack-app-reactjs-and-nestjs.onrender.com (Visit [Heere](https://dashboard.render.com/web/srv-cp3kclol6cac73f7ega0) to activate the inactive webapp)

# Scripts to run the fullstack app on local machine
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
1. After token expires, remove it from the localStorage as well
2. Try working on a logic, to show a logout modal popup, like in SignIn.jsx, and remove the component for Signout.jsx. See if it works. Also, handle server-side token expiration as well.


-> Old background-color: #282c34;
