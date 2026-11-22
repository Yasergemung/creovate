export type Creator = {
  slug: string; name: string; handle: string; category: string; country: string;
  bio: string; followers: string; initials: string; accent: string;
  socials: { platform: string; username: string; url: string }[];
};
export const creators: Creator[] = [
  { slug:'yasser-gaming', name:'Yasser Gaming', handle:'@yassergaming', category:'Gaming', country:'Egypt', bio:'Gaming creator sharing Minecraft adventures, challenges, and livestream moments.', followers:'12.8K', initials:'YG', accent:'from-violet-600 to-cyan-500', socials:[
    {platform:'YouTube',username:'@YasserGaming',url:'https://youtube.com/'},
    {platform:'TikTok',username:'@YasserGaming',url:'https://tiktok.com/'},
    {platform:'Instagram',username:'@YasserGaming',url:'https://instagram.com/'}
  ]},
  { slug:'nour-tech', name:'Nour Tech', handle:'@nourtech', category:'Technology', country:'Egypt', bio:'Simple technology explainers, useful apps, and practical tutorials.', followers:'28.4K', initials:'NT', accent:'from-cyan-600 to-blue-500', socials:[
    {platform:'YouTube',username:'@NourTech',url:'https://youtube.com/'},
    {platform:'Instagram',username:'@NourTech',url:'https://instagram.com/'}
  ]},
  { slug:'karim-football', name:'Karim Football', handle:'@karimfootball', category:'Football', country:'Egypt', bio:'Football stories, match reactions, and skills content.', followers:'8.2K', initials:'KF', accent:'from-emerald-600 to-lime-500', socials:[
    {platform:'TikTok',username:'@KarimFootball',url:'https://tiktok.com/'},
    {platform:'YouTube',username:'@KarimFootball',url:'https://youtube.com/'}
  ]},
  { slug:'sara-creates', name:'Sara Creates', handle:'@saracreates', category:'Lifestyle', country:'Jordan', bio:'Creative routines, lifestyle videos, and behind-the-scenes content.', followers:'16.1K', initials:'SC', accent:'from-pink-600 to-orange-400', socials:[
    {platform:'Instagram',username:'@SaraCreates',url:'https://instagram.com/'},
    {platform:'TikTok',username:'@SaraCreates',url:'https://tiktok.com/'}
  ]},
];
