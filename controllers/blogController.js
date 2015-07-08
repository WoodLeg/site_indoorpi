

var posts = [
   {
      title: 'Post1',
      img: 'assets/img/blog/d.jpg',
      taille: '',
      display: 'm8 l8',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   },
   {
      title: 'Post2',
      img: 'assets/img/blog/d.jpg',
      taille: '',
      display: 'm4 l4',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   },
   {
      title: 'Post3',
      img: 'assets/img/blog/d.jpg',
      taille: '',
      display: 'm5 l5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   },
   {
      title: 'Post4',
      img: 'assets/img/blog/d.jpg',
      taille: '',
      display: 'm7 l7',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   },
   {
      title: 'Post5',
      img: 'assets/img/blog/d.jpg',
      taille: 'large',
      display: 'm12 l12',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   },
   {
      title: 'Post6',
      img: 'assets/img/blog/d.jpg',
      taille: 'large',
      display: 'm12 l12',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
   }
]

function getAllPosts(request, response){
   response.send(posts);
}

function getPost(request, response){

   for (var i = 0; i < posts.length; i++) {
      if (posts[i]['title'] == request.name) {
         response.send(posts[i]);
      }
   }

}

module.exports.getAllPosts = getAllPosts;
module.exports.getPost = getPost;
