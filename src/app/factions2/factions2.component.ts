import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap, TweenMax, TweenLite } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { AuthService } from 'src/app/AuthenticationPackage/core/auth.service'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FactiondialogComponent } from './factiondialog/factiondialog.component';


//gsap.registerPlugin(Draggable);




@Component({
  selector: 'app-factions2',
  templateUrl: './factions2.component.html',
  styleUrls: ['./factions2.component.scss']
})
export class Factions2Component implements OnInit {

	cardArray$;

	TCcardObject: Object = {
		EmeraldEnclave:{
			name: "The Emerald Enclave",
			description: `The Emerald Enclave is a far-ranging group that opposes threats to the natural world and helps others survive in the wilderness. Branches of the organization are scattered throughout Faerûn and often operate in isolation from the others. This existence teaches the Enclave’s members a fierce self-reliance and mastery of certain fighting and survival skills.
			\nA ranger of the Enclave might be hired to lead a caravan through a treacherous mountain pass or the frozen tundra of Icewind Dale. A druid might volunteer to help a village prepare for a long, brutal winter. Barbarians and druids who live as hermits might appear from nowhere to help defend a town against marauding orcs.
			\nMembers of the Emerald Enclave know how to survive and, more importantly, to help others do the same. They are not opposed to civilization or progress, but they strive to keep it in balance with the wild. They restore and preserve the natural order, even as they root out and destroy all that is unnatural. They keep the elemental forces of the world in check and keep civilization and the wilderness from destroying one another.
			`,
			img: "assets/pics/emerald-enclave-crest.png",
		},
		harpers:{
			name: "The Harpers",
			description: `This clandestine network of spellcasters and spies seeks to tip the scales in favor of the innocent, the weak, and the poor within the Realms. Harper agents pride themselves on being incorruptible defenders of good, and they never hesitate to aid the oppressed. Because they prefer to work behind the scenes, they are rarely noticed as they thwart tyrants, depose rulers, and head off any growing force that is rumored to have evil intent. The Harpers has its finger on the pulse of power in the Realms and works tirelessly to even the odds for the downtrodden.
			\nIndividual Harper agents operate alone, relying on their wits and extensive information networks to gain an advantage over their enemies. They know that knowledge is power, so gathering intelligence beforehand is paramount to their success. They are well-informed and always have access to aid, magical and otherwise. Veteran members have access to secret caches of knowledge stashed all over Faerûn, along with trusted sources stationed in every major town and city.
			\nThe organization is always on the lookout for powerful items, expressly to keep them out of the hands of evildoers. To this end its agents use various guises and identities to gain access to carefully guarded secrets such as ancestral maps, buried cities, and mages’ keeps.
			\nThe bond between Harpers is strong, and their friendships are nigh unbreakable. Rarely do they operate in the open, but on rare occasions they must, because there is no other choice. When that happens, you can be sure that a fellow Harper is watching closely, ready to emerge from the shadows and help a comrade at a moment’s notice.
			`,
			img: "assets/pics/the-harpers-crest.png",
		},
		lordsalliance:{
			name: "The Lords Alliance",
			description: `The Lords’ Alliance is an association of rulers from cities and towns across Faerûn (primarily in the North), who believe that solidarity is needed to keep evil at bay. The rulers of Waterdeep, Silverymoon, Neverwinter, and other free cities dominate the coalition, and all lords in the Alliance work primarily for the fate and fortune of their individual settlements.
			\nAlliance agents include sophisticated bards, zealous paladins, talented mages, and grizzled warriors. They are chosen primarily for their loyalty and are experts in observation, stealth, innuendo, and combat. Backed by the wealthy and the privileged, they carry fine equipment (often disguised to appear common), including large numbers of scrolls scribed with spells of communication.
			\nAgents of the Lords’ Alliance ensure the safety and prosperity of civilized Faerûn by standing united against the forces that threaten civilization. They proactively eliminate such threats by any means, fighting with pride for the glory and security of their people, and for the lords who rule over them. However, Alliance operatives are often glory hounds, looking to gain a leg up on their counterparts from other Alliance cities. The leaders of the Alliance know that the order will survive only if its members support each other, requiring a balance between pride and diplomacy. Rogue agents within the Lords’ Alliance are rare, but defections have been known to occur.
			`,
			img: "assets/pics/lords-alliance-crest.png",
		},
		orderofthegauntlet:{
			name: "The Order of the Gauntlet",
			description: `The Order of the Gauntlet is a relatively new organization dedicated to smiting evil wherever it lurks and without hesitation. The Order understands that evil wears many guises, playing games and tricking others in order to spread. That is why its members act on their own authority, identifying threats and smashing them before they can grow.
			\nBecause the seeds of evil are nourished in the shadows, the Order of the Gauntlet rides out to the most dangerous dungeons, the darkest caverns, and the foulest pits to weed out wrongdoers. But the Order is keenly aware that the shadow of evil lies within everyone, waiting for a moment when it can gain a foothold on their souls. Thus its paladins, monks, and clerics spend long hours deep in prayer to keep their inner eye vigilant and focused on their own thoughts and emotions. In this way they purify themselves from within before taking up their swords to cleanse the world.
			\nThe Order of the Gauntlet believes that all sentient beings must come to the light of reason and goodness of their own volition. That is why it is not interested in controlling minds: it focuses only on deeds, setting an example to the world in hopes of inspiring and enlightening others. The Order holds that faith in one’s god, one’s friends, and one’s self are the greatest weapons in quelling the hordes of malice.
			\nWith such devout conviction, the Order’s members can be depended on as a source of strength to themselves and others, a bright light against the darkness. They are not preemptive bullies, though. A strict code of honor allows them to strike only when evil deeds are being committed. Thus, the Order of the Gauntlet is hypervigilant, using every resource at their disposal—both divine and mundane—to know where and when dark deeds will occur.
			`,
			img: "assets/pics/order-of-gauntlet-crest.png",
		},
		zhentarim:{
			name: "The Zhentarim",
			description: `The Zhentarim, or Black Network, is an organization of well-trained mercenaries, savvy rogues, and crafty warlocks who seek to expand their influence and power throughout Faerûn. Agents of the Zhentarim feel that if they play by the rules, nothing gets done. Ultimately, they want to make the rules—and, in some cases, they already do. They walk a fine line when it comes to the letter of the law and don’t shy away from the occasional shady deal or illicit activity to get what they want.
			\nTo the Zhentarim, wealth is power. Its agents know that nothing else inspires such confidence and dispels doubt so well. In an instant, wealth speaks louder than a thousand bards. Zhentarim agents routinely carry the finest weapons and armor, with no expense spared. When a merchant needs an escort for a caravan, when a noble family requires bodyguards to protect its holdings, or when a city is desperate for trained soldiers to defend its walls, the Zhentarim provides the best warriors money can buy.
			\nThe organization encourages individual ambition and rewards innovators who take matters into their own hands. Results are all that matter. Those who come into the Black Network with nothing can become major players within the organization through their own moxie and hard work.
			`,
			img: "assets/pics/zhentarim-crest.png",
		},
	}

	MCcardObject: Object = {
		dwendalianempire:{
			name: "The Dwendalian Empire",
			description: `The Dwendalian Empire has reigned over Western Wynandir for over twelve generations. Imperial rule is maintained through its powerful military, its policy of religious restriction, and the support of the secretive Cerberus Assembly. Though these institutions nominally exist to ensure the safety of the populace from foreign threats, terrible dangers that wander the wilds, and lingering evils that seep from the scars of the Calamity, they also allow the empire to maintain strict social order within its territories.
			\nKing Bertrand Dwendal is now two months past his sixty-eighth birthday, and his iron will has not wavered with age. A tall, powerful man, King Dwendal rewards loyalty and swiftly punishes insolence and failure. His family has developed a totalitarian rule that reaps heavy taxes and looms over society with a military presence that only grows stronger with proximity to the capital city of Rexxentrum. While civic unrest does rise beyond mere mutterings from time to time, reminders of the dangerous creatures that live beyond the guarded borders of each city and the protections offered within the empire generally keep the populace in line. Those that rebel often find themselves in chains or forgotten in a dungeon.
			\nDwendalian society has a rigid caste system, in which denizens who have mastery over the arcane are considered elite members of society. Many Dwendalian ladies and lords came from a sorcerous bloodline or studied the arcane arts within the walls of the Soltryce Academy. Those who especially excel in their magics or were born into prominent families can come to hold power as a member of the Cerberus Assembly, a council of extremely powerful mages that works directly with King Dwendal and his councilors to develop and enforce laws throughout Western Wynandir. However, distrust between the king and the Cerberus Assembly runs deep, for they both wish to eliminate the other and enjoy uncontested power.
			\nMost cities and townships throughout the empire are ruled by a local government under the leadership of a starosta, usually a native baron appointed by the Crown and the Cerberus Assembly. Reporting directly to the king’s council, the starosta is given absolute control over local government, appointing and maintaining responsibility for the heads of the city guard (watchmaster), the regional military (warmaster), local commerce (coinmaster), infrastructure (pithmaster), religious practices (idolmaster), and the courts of law (lawmaster). Twice a year, tithe collectors (nicknamed “Reapers”) visit each imperial city to inspect households for records and proof of income, collecting a percentage of their earnings in coin as determined by the tithe collector.
			\nThe empire’s military force currently stands at around 35,300 Righteous Brand soldiers across all regiments, and 5,200 Crownsguard across all cities. The majority of the Righteous Brand forces were deployed to fortifications along the Xhorhasian border at the onset of the current war.
			\nSoon after the Dwendalian bloodline came into power, there was a short-lived rebellion helmed by religious civilians. It was swiftly quelled and the rebel leaders were executed in an event known as the Admonition. The ruling class has regarded religion with suspicion ever since, believing that faith inspires the unworthy to rise above their station and spark fruitless rebellion. Instead of abolishing all religious practices, the empire regulates worship within its boundaries. All temples are owned and run by the government, and must be dedicated to deities approved by the Crown. Priests and clerics are on the Crown’s payroll to preach only approved religious texts. Keeping private shrines or worshiping outside official temples is punishable by fines or imprisonment. The only deities that are approved by the empire are Erathis the Law Bearer, Bahamut the Platinum Dragon, Moradin the All-Hammer, Pelor the Dawn Father, Ioun the Knowing Mentor, and the Raven Queen, Matron of Death.
			`,
			img: "assets/pics/dwendalian-empire-crest.png"
		},
		kryndynasty:{
			name: "The Kryn Dynasty",
			description: `The Kryn Dynasty rules the northern wastes of Xhorhas, and has only revealed itself to the wider world within the past century. Centered around — and under — the ruins of Ghor Dranas in Eastern Wynandir, the dynasty governs many townships and small villages where the Kryn have helped establish a modicum of civilized living among the nomadic wastefolk. They believe that beings not yet beyond redemption can be turned to the light of the Luxon, and often struggle with the unruly denizens of the wastes, hoping to gain converts to their cause and faith. Those that do accept the dynasty often do so because they seek protection from the dregs of the Calamity that wander the wastes, as well as the scouts of the Dwendalian Empire.
			\nDark elves are the most populous race within the Kryn Dynasty. The drow were the first people to uncover the first buried Luxon beacon many ages ago, in a time before they turned from Lolth and escaped enslavement from the Betrayer Gods. The dark elves claimed the dread citadel of Ghor Dranas as their own, as well as the massive network of underground caverns that make up the Underdark of Wildemount. The Kryn are stealthily becoming a force to be reckoned with.
			\nThe Kryn drow who emerged from the shadowed depths of the caverns beneath Xhorhas now endure periods of sunlight as part of their worship, though their cities are shaded by umbral magic during daylight hours. When hunting, or in times of conflict, the warriors of the Kryn don their signature chitinous armor. A series of small airways woven through this armor can be opened to emit a loud, clicking buzz to intimidate their foes as they charge. This noise has inspired outsiders to call the Kryn “cricks,” referring to this cricket-like din.
			\nArtifacts left behind by the Luxon that hold its essence are known as Luxon beacons and are coveted by the Kryn Dynasty as central to their civilization. If a proven soul is ritualistically bound to a Luxon beacon, they can enter a process called the consecution: when a mortal bound to the Luxon dies within a hundred miles of a beacon, the beacon ensnares their soul from its intended afterlife and prepares it to be reborn in a new child within that same vicinity. When that child then matures into adolescence, they begin to recall subtle knowledge from their past life’s experiences, a process called anamnesis. Through meditation with a guide, they can unlock the memories of their past lives and become a more complete being. When a soul has cycled enough to believe they are ready to greet the Luxon, they are called an Umavi, or “perfect soul,” and are revered within the Kryn society. Some beings that naturally reincarnate, such as the phoenix, are considered holy creatures that carry a shard of the Luxon within themselves.
			\nIf a life continues long enough to achieve a state of clarity called achess, where they believe that they’ve learned all they can learn from their current life, they can choose to partake in a ritualistic termination of their current life, assisted by an Umavi in proximity to a beacon, thereby setting them on the path to a new birth. While considered an honor within the Kryn Dynasty, this practice is misunderstood and seen as barbaric outside their culture.
			\nThe Kryn Dynasty is a society restructured from the Lolthite history they rejected. The people of the dynasty stand under the first Umavi, known as Bright Queen Leylas Kryn. Beneath the first Umavi, there are twelve noble Dens that mark families of souls who have lived together through generations: Dens Kryn, Mirimm, Thelyss, Hythenos, Icozrin, Biylan, Tasithar, Duendalos, Daev’yana, Omrifar, Beltune, and Zolaed. When someone is believed to be experiencing anamnesis, they submit to a deep meditation with a guide trained in the ways of consecution. This process helps restore memories of the past life, which then mingle with current memories.
			\nThe awakened soul is then reunited with their Den. Dens do grow as new souls enter the consecution and join their ranks, and new Dens are established with each generation. The oldest Dens, especially those helmed by an Umavi, are held in the highest esteem, and generally answer directly to the Bright Queen. The older the soul, the more prestige it holds in the dynasty. Beneath the Dens of Rosohna, guilds and Den representatives govern the other cities of the dynasty that stretch across Xhorhas, spreading the faith of the Luxon and watching over all Xhorhasians who seek the safety of civilization.
			\nThis seemingly benevolent societal structure does have a dark side. A closely guarded secret of the highest Umavi is a challenge in the consecution called typhros: some souls that have undergone multiple cycles of the consecution are driven mad when their minds cannot reconcile the memories of many lifetimes. Those who fall to typhros are quietly removed from the dynasty and either left in the wastes or mercifully slain away from the beacons. Signs of madness are beginning to show in the Bright Queen herself, but those closest to her do all they can to shield others from such portents.
			\nIt is believed that the Luxon cherishes unity in community, but also values free choice and the power of the individual mind. For each soul to carve a unique path is the best way for a soul to learn about the world. Casting off the teachings of Fate and Destiny taught by some of the current pantheon, the followers of the Luxon are taught that the real power of the universe comes from the power of choice. Many possible futures all await your path, and the universe trembles with anticipatory power as you approach every decision. This power is called dunamis, the energy of potentiality, and the coalescing architecture of the multiple futures leading into each moment is released when an outcome is brought to reality. It is the energy that suffuses every Luxon beacon to prepare the lives to come, and it is the basis of the Kryn’s unique divine crafts and arcane abilities.
			\nThe Kryn Dynasty has uncovered four beacons and is certain that more remain to be discovered. It is believed that once all the beacons are brought together, the Luxon will be summoned from their slumber to ask their children the great question and impart the truth. It is said that at this time, the Luxon will take those who entered the consecution and abandon this lesser world to start a new world elsewhere.
			\nThe Aurora Watch legionnaires of the Kryn currently number around 21,600 in total. Around 13,200 Aurora Watch are divided among the cities under the dynasty’s protection, with another 3,300 Aurora Watch stationed in and around the capital of Rosohna — formerly known as Ghor Dranas — to keep the peace and defend the region. Approximately 5,100 soldiers are scattered throughout the Underdark beneath Wildemount at different locations of interest, many employing magically controlled purple worms to allow elite units to navigate the caverns quickly. The remainder of the watch is stationed along the border of Western Wynandir to prevent the empire’s incursions — and to seize land from the empire as they advance.
			`,
			img: "assets/pics/kryn-dynasty-crest.png",
		},
		clovisconcord:{
			name: "The Clovis Concord",
			description: `Nearly four hundred years ago, an alliance of the Ki’Nau islanders and foreign Marquesian traders founded a new nation on the tropical Menagerie Coast. The Clovis Concord is a democratic nation that enforces law and order, and regulates commerce along the length of the coast. The nation is composed of eight independent city-states, each ruled by its own marquis, which operate as one union under the banner of the Clovis Concord. This arrangement ensures uniform laws, regulation of trade, and mutual protection between the city-states. These eight cities are Port Damali, Port Zoon, Gwardan, Tussoa, Othe, Feolinn, Nicodranas, and Brokenbank.
			\nOpen shipping lanes and inviting tropical scenery have made the domain of the Clovis Concord a cultural melting pot and a popular place to live or visit. Knowing this, the respective marquises uphold a long tradition of welcoming all weary travelers and providing an atmosphere of color and delight. If there is gold to be spent, the concord is eager for you to spend it within their cities. Between the venues for entertainment and vice, and the ample business opportunities, the concord hopes to convince those with wealth to spend it here, outside the gates of the Dwendalian Empire.
			\nInternally, each marquis of the Clovis Concord keeps a tight grip on the shipping and trade that comes though their cities, overseeing all guilds that organize imports and exports and managing a handful of guildmasters that form the backbone of local commerce. When a marquis dies or is impeached by the other members of the concord, the remaining members choose a successor.
			\nWarriors who prove their might through gladiatorial bouts during times of celebration and ceremony are asked to join the Zhelezo, a well-paid guard force that works for the governing marquis to enforce the laws. Cities have one or more magistrates that oversee judgment on legal matters and criminal punishment.
			\nWhile the cities do work together for the good of the concord, they are also each in silent competition with each other, flaunting their affluence and clientele at every opportunity. When a prominent figure from the far reaches of Exandria finds their way to the Menagerie Coast, it’s not uncommon for them to be courted by multiple marquises in an attempt to convince the personage to stay as a guest of their city.
			\nIn recent times, the Myriad has subtly infiltrated the Clovis Concord, often with the unwitting aid of greedy local politicians. Rumors of criminal collusion have raised suspicion amid members of the concord. Sooner or later, the tension will have to break — and the fallout won’t be pretty.
			\nDespite the concord’s cordial relationship with the Dwendalian Empire, their proximity to the imperial power is a lingering source of unease. Currently, the concord maintains a standing military of 7,800 Shore Warden soldiers across the coast, a nautical fleet of 370 ships, and 5,200 Zhelezo divided between the cities. Some of the Shore Wardens are posted inland, scattered around and within the Cyrios Mountains, where they maintain forts along the border with Western Wynandir and the Dwendalian Empire.
			`,
			img: "assets/pics/clovis-concord-crest.png",
		},
		myriad:{
			name: "The Myriad",
			description: `Any civilized society will turn the people it has failed into criminals, and the societies of Wildemount are no exception. The continent’s largest criminal organization took shape about eighty years ago, when a shipping company in the Dwendalian city of Yrrosa turned to smuggling contraband to make ends meet. This tightknit group of clever smugglers soon began to bargain with their competitors, employing blackmail and offering membership to their organization as an alternative to elimination.
			\nThe syndicate grew with alarming speed, infiltrating the criminal underbelly of every major city in Western Wynandir. Masquerading as purveyors of antiquities and foreign textiles, the Myriad focuses on providing their clients with exotic goods, such as illicit substances and magical beasts, or supplying hired muscle to intimidate their clients’ rivals. The worst of the Myriad even deal in human merchandise.
			\nOriginally centered in Yrrosa, the Myriad now operates across the continent as a loose network of gang bosses who run their own local sects without direct oversight from the mysterious heads of the syndicate. Each satellite group is expected to regularly deliver information and a cut of their profits to the leadership. Those who fail to pay up receive quiet threats of enslavement or assassination — and the Myriad always makes good on its threats.
			\nMembers of the Myriad are sworn to keep their syndicate secret by pretending that their chapter is still just another local gang. This has given the Myriad a sinister and enigmatic reputation, which further obfuscates its activities from the authorities. Since members of the the Myriad prefer coercion to public displays of violence, officers of the law often fail to recognize Myriad activity until it’s too late.
			\nThe empire scored a major victory fifteen years ago when they discovered and raided the central Myriad stronghold in Yrrosa, forcing the surviving leadership to scatter across the continent. The Myriad has emphasized the narrative of its own fall in order to keep a low profile, though in fact it has retained most of its power. Its influence has stretched to the distant corners of Wildemount as it bide its time and waits to reinstate its control within the empire. Shifting tactics, the Myriad has now begun seeding major factions with double agents, who turn the most foolish or corrupt of their colleagues into the Myriad’s unwitting pawns.
			`,
			img: "assets/pics/the-myriad-crest.png",
		},
		revelry:{
			name: "The Revelry",
			description: `The Revelry’s allies within the Clovis Concord will tell you that they turned to piracy because of the concord’s excessive taxes and unjust laws. Perhaps it began that way, but over time, a movement that began as public dissent turned to lawful protest, which then became violent action. Eventually, a union of disenfranchised salvage ships and trade vessels fought their way into the Dragshallow Reef and violently overthrew the small sanctuary port of Darktow.
			\nAfter establishing a lawless base of operations on the isle of Darktow, these pirates began stalking the well-known shipping routes of the Menagerie Coast to harry, intimidate, steal from, and destroy passing ships that flew under the concord’s banner. Calling themselves The Revelry, these “free folk of the sea” have now spent over forty years terrorizing the Lucidian Ocean. With loose morals and a twisted code of honor, they take what they want from less protected targets while living a life of debauchery in the well-guarded haven of Darktow. The Revelry lacks a uniform symbol, instead changing the colors and symbols of its banner regularly to avoid counterfeiting and infiltration.
			\nThe Revelry is governed by a collective of captains, all of whom defer to the final word of the Plank King, a capricious monarch who never leaves Darktow. The original Plank King, Hunnis Breeah, ruled for twenty-five years before a goliath named Wyatt Maranoss challenged him for his increasingly lackadaisical attitude — and won. Now Breeah is dead, and Wyatt claims the title of Plank King.
			`,
			img: "assets/pics/the-revelry-crest.png",
		},
	}


	





  constructor( public authService: AuthService,
			public dialog: MatDialog ) { }

  ngOnInit(){  }



  openDialog(faction): void{
	const dialogConfig = new MatDialogConfig()

	dialogConfig.disableClose = true;
	dialogConfig.autoFocus = true;
	dialogConfig.data = {faction};
	dialogConfig.panelClass = ".faction-dialog";


	const dialogRef = this.dialog.open(FactiondialogComponent, dialogConfig)

		dialogRef.afterClosed().subscribe(result => {
			console.log("dialog closed");
		});
}





}

	
	//C:\Users\627646\webdev\samsite-dnd\node_modules\@angular\material\_theming.scss*/
