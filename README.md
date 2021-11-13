# Pets API 
## To use api you need to do some things 
## First, clone repository : `git clone https://github.com/ariel3259/petApi`
## Second, install requirements
### Requirements:

1. Runtime:
Nodejs 16.13.0(lts)
2. Package Manager:
npm 8.1.0(lts)
3. Modules:

    . express 4.17.0

    . cors 2.8.5

    . mysql2 2.3.2

    . bcrypt 5.0.1

### How to install them:

 Runtime and Package Manager:
First, To install  nodejs and npm, you need to download setup client from [its website](nodejs.org), then you open it and click next to install it. 

If you are using some Linux distro, to install nodejs and npm you need to run the following command:

. Debian/Ubuntu based Distro: 
> sudo apt install nodejs  npm

. ArchLinux based Distro:
> sudo pacman -S nodejs npm

. Fedora or RHEL:
> sudo dnf install nodejs

Modules:
Second, to install modules you need to run the following command:

>  npm i

 ---
   ## Routes of Api :


  ###  1. Pet's endpoints:

        . Get http://localhost:3000/api/pets : returns a pet array from pets table at pets_db, this endpoint has a header parameter(flag) who determines if shows pets with Owner(1) or not(0), pet is a json object thats storages: 
            
            - A string as id.
            - A string as name.
            - An integer as age.
            - A string as animal.

        . Post http://localhost:3000/api/pets : storages a pet into pets table where pet is a json object that inside body has: 
            
            - A string as name.
            - An integer as age.
            - A string as animal. 

        . Put http://localhost:3000/api/pets : modifies a pet (from pets table) by other pet, where that other pet is another json object:
            
            - A string as name.
            - An integer as age.
            - A string as animal.
            - A string as id.

        . Delete http://localhost:3000/api/pets : deletes a pet (from pets table) by id pet, where that id pet is get by headers params as id.

        . Get http://localhost:3000/api/pets/description : reads a txt file and returns the text of file.

        . Get http://localhost:3000/api/pets/images : a static server thats storages pets images.


  ###    2. Owner's endpoints:

        . Get http://localhost:3000/api/owner : returns an owner array from owner table at pets_db, owner is a json object thats storages:
        
            - A string as id.
            - A string as name.
        
        . Post http://localhost:3000/api/owner : storages an owner into owner table at pets_db where owner is a json object thats storages:

            - A string as name.

        . Post http://localhost:3000/api/owner/adopt/pet : modifies owner_id of the pet (selected by id) to owner's id, where owner's id and pet's id are part of a json object.
        
        . Post http://localhost:3000/api/owner/pets : returns the pets of the owner by owner's id, owner's id gets by headers params. 
    

  ###    3. User's endpoints:

    . Post http://localhost:3000/api/users/register : storages a user into users table at pets_db, where user is a json object thats storages:
        
        - A string as email.
        - A string as password.

    . Post http://localhost:3000/api/users/auth : verifies if the user exist and verifies if has true password. Needs a json object thats storages:

        - A string as email.
        - A string as password.

    . Get http://localhost:3000/api/users/messages : returns  a random greeting.

    . Post http://localhost:3000/api/users/text: storages text message into a txt file (if not exist then create it), where text message is a string.  



        
    
    


