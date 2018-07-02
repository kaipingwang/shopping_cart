var mongoose =require('mongoose');
var Product =require('../models/products');
mongoose.connect('mongodb://happytvuser:3wnf4w06tJ@localhost:27017/happytv');

var products = [
new Product({
    imagePath:"/images/1.jpeg",
    title:"Charlie's Angels",
    genre:'Action',
    description:"Charlie's Angels is an American crime drama television series that aired on ABC from September 22, 1976 to June 24, 1981, producing five seasons and 110 episodes. The series was created by Ivan Goff and Ben Roberts and was produced by Aaron Spelling. It follows the crime-fighting adventures of three women working in a private detective agency in Los Angeles, California, and originally starred Kate Jackson, Farrah Fawcett (billed as Farrah Fawcett-Majors), and Jaclyn Smith in the leading roles and John Forsythe providing the voice of their boss, the unseen Charlie Townsend, who directed the Angels crime-fighting operations over a speakerphone.There were a few casting changes: after the departure of Fawcett and Jackson came the additions of Cheryl Ladd, Shelley Hack, and Tanya Roberts.",
    price:30,
    video:"https://www.youtube.com/embed/4cjTbd-7Jv0",
    actor:"Ivan Goff, Ben Roberts",
    rate:'80%',
    comments:28
}),
new Product({
  imagePath:'/images/2.jpg',
  title:'Justice League',
  genre:'Hero',
  description:" Justice League is a 2017 American superhero film based on the DC Comics superhero team of the same name, distributed by Warner Bros. Pictures. It is the follow-up to 2016's Batman v Superman: Dawn of Justice and the fifth installment in the DC Extended Universe (DCEU). The film is directed by Zack Snyder, written by Snyder and Chris Terrio, and features an ensemble cast that includes Ben Affleck, Henry Cavill, Gal Gadot, Ezra Miller, Jason Momoa, Ray Fisher as the"+
  "titular Justice League team, alongside Amy Adams, Jeremy Irons, Diane Lane, Connie Nielsen, and J. K. Simmons. Joss Whedon, who served as the post-production director of Justice League after Snyder stepped down from directing duties two months after the death of his daughter, received a special screenwriting credit. Snyder received sole director credit. In the film, Batman and Wonder Woman recruits Flash, Aquaman, and Cyborg after Superman's death to save the world from the catastrophic threat of Steppenwolf and his army of Parademons.",
  price:40,
  video:"https://www.youtube.com/embed/r9-DM9uBtVI",
  actor:"Zack Snyder",
  rate:'70%',
  comments:30
}),

new Product({
  imagePath:"/images/3.jpeg",
  title:'Bleeding Steel',
  genre:'Sci-Fi',
  description:'Bleeding Steel is a 2017 Chinese science fiction cyberpunk action film directed and written by Leo Zhang and stars Jackie Chan. It was released in China on December 22, 2017. It is scheduled to be released in the United States by Lionsgate Premiere on July 6, 2018.[3] The U.S. distributor, Lionsgate Premiere, released the U.S. trailer for Bleeding Steel on May 17, 2018 and indicated that the film will be released in movie theaters and digitally on-demand on July 6, 2018.',
  price:15,
  video:"https://www.youtube.com/embed/ygREn2TBU08",
  actor:"Leo Zhang",
  rate:'60%',
  comments:28
}),
new Product({
    imagePath:"/images/4.jpg",
    title:'Superman Returns',
    genre:'Hero',
    description:"uperman Returns is a 2006 American superhero film directed and produced by Bryan Singer. It is based on the DC Comics character Superman and serves as a homage sequel to the motion pictures Superman: The Movie (1978) and Superman II (1980),[2][3] while ignoring the events of Superman III (1983) and Superman IV: The Quest for Peace (1987), including its spin-off Supergirl (1984).The film stars Brandon Routh as Clark Kent/Superman, Kate Bosworth as Lois Lane, Kevin Spacey as Lex Luthor, with James Marsden, Frank Langella, and Parker Posey.",
    price:33,
    video:"https://www.youtube.com/embed/kB9ETzsjPpw",
    actor:"Bryan Singer",
    rate:'90%',
    comments:230
}),
new Product({
  imagePath:'/images/5.jpg',
  title:'极限挑战大电影',
  genre:'Adventure',
  description:"《极限挑战》是由SMG尚世影业、东方卫视联合出品的喜剧悬疑片，由严敏、任静联合执导，黄渤、孙红雷、黄磊、罗志祥、王迅、张艺兴领衔主演，赵丽颖、于和伟特别主演，影片于2016年1月15日在中国大陆以2D格式正式上映影片讲述了极限男人帮六人在拍摄《极限挑战》时，意外被雷劈回到几百年前的大明朝，他们被迫根据皇帝留下的“圣火令”寻找皇家宝藏，踏上玩命之旅的故事",
  price:29,
  video:"https://www.youtube.com/embed/BLTW45kVhi0",
  actor:"严敏、任静",
  rate:'70%',
  comments:180
}),
new Product({
  imagePath:"/images/6.jpg",
  title:'SRampage',
  genre:'Adventure',
  description:"Rampage is a 2018 American science fiction monster film directed by Brad Peyton, and loosely based on the video game series of the same name by Midway Games. The film stars Dwayne Johnson, Naomie Harris, Malin Akerman, Jake Lacy, Joe Manganiello, and Jeffrey Dean Morgan. It follows a primatologist named Davis Okoye who must team up with George, an albino gorilla who turns into a raging creature of enormous size as a result of a rogue experiment, to stop two other mutated animals from destroying Chicago. It is the third collaboration between Peyton and Johnson, following Journey 2: The Mysterious Island (2012) and San Andreas (2015).",
  price:25,
  video:"https://www.youtube.com/embed/coOKvrsmQiI",
  actor:"Brad Peyton",
  rate:'90%',
  comments:580
})]
var done =0;
for (let i=0; i<products.length;i++){
  done++;
  products[i].save((err,res)=>{
    if(done ===products.length)
          exit();
  });
}

var exit =()=>{
  mongoose.disconnect();
}
