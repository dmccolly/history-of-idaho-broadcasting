interface Station {
  id: string;
  name: string;
  frequency: string;
  format: string;
  logo: string;
  description: string;
  fullContent: string;
  color: string;
}

const stationData: Station[] = [
  {
    id: "krvb",
    name: "KRVB",
    frequency: "94.9 FM",
    format: "Adult Album Alternative (AAA)",
    logo: "/images/stations/krvb-logo.png",
    description: "KRVB 94.9 FM 'The River' is Boise's Adult Album Alternative (AAA) station, offering a diverse mix of rock, folk, indie, and alternative music since 1995.",
    fullContent: `
      <h3>History of KRVB 94.9 FM "The River"</h3>
      <p>KRVB 94.9 FM, known as "The River," has a rich history dating back to its origins as KFXD-FM in 1975. The station has undergone several transformations over the decades before establishing itself as one of Boise's premier Adult Album Alternative (AAA) stations.</p>
      
      <h3>Early Years</h3>
      <p>The station began as KFXD-FM in 1975, simulcasting its AM sister station's programming. In the late 1970s, it became KFXD-FM "KF-95" with a Top 40 format that continued into the early 1980s.</p>
      
      <h3>Transition to Adult Contemporary</h3>
      <p>By 1984, the station had evolved into KIYS "Kiss 95 FM" with an Adult Contemporary format. This format continued through various ownership changes until the mid-1990s.</p>
      
      <h3>Birth of "The River"</h3>
      <p>In 1995, the station was rebranded as KRVB "The River" and adopted the Adult Album Alternative (AAA) format it maintains today. The format features a diverse mix of rock, folk, indie, and alternative music that appeals to a mature audience seeking thoughtful, quality music programming.</p>
      
      <h3>Community Involvement</h3>
      <p>Throughout its history as The River, KRVB has been deeply involved in the Boise community, supporting local events, concerts, and charitable causes. The station has built a reputation for promoting local artists alongside established national acts.</p>
      
      <h3>Current Programming</h3>
      <p>Today, KRVB continues to offer its signature AAA format with a mix of new music discovery and familiar favorites. The station features both local and nationally syndicated programming, maintaining its position as a respected voice in Boise's radio landscape.</p>
    `,
    color: "#4B9CD3"
  },
  {
    id: "ktik",
    name: "KTIK",
    frequency: "93.1 FM",
    format: "Sports",
    logo: "/images/stations/ktik-logo.png",
    description: "KTIK 93.1 FM 'The Ticket' is Boise's premier sports radio station, featuring local and national sports coverage, live game broadcasts, and sports talk programming.",
    fullContent: `
      <h3>History of KTIK 93.1 FM "The Ticket"</h3>
      <p>KTIK 93.1 FM, known as "The Ticket," is Boise's dedicated sports radio station. The station has established itself as the go-to source for sports coverage in the Treasure Valley.</p>
      
      <h3>Sports Focus</h3>
      <p>KTIK features comprehensive coverage of local sports, including Boise State University athletics, high school sports, and professional teams. The station also carries national sports programming and live game broadcasts.</p>
      
      <h3>Local Programming</h3>
      <p>The station produces several local sports talk shows featuring knowledgeable hosts who provide analysis, commentary, and interviews with athletes, coaches, and sports personalities.</p>
      
      <h3>Community Connection</h3>
      <p>KTIK has built strong connections with the local sports community, serving as a platform for fans to engage with their favorite teams and sports figures through call-in shows and special events.</p>
    `,
    color: "#E74C3C"
  },
  {
    id: "kboi",
    name: "KBOI",
    frequency: "670 AM",
    format: "News/Talk",
    logo: "/images/stations/kboi-logo.png",
    description: "KBOI 670 AM is one of Idaho's oldest and most respected radio stations, providing news, talk, and information programming to the Treasure Valley since 1927.",
    fullContent: `
      <h3>History of KBOI 670 AM</h3>
      <p>KBOI 670 AM is one of Idaho's oldest and most influential radio stations, with a history dating back to 1927. For nearly a century, KBOI has been a trusted voice for news and information in the Treasure Valley.</p>
      
      <h3>Pioneer in Idaho Broadcasting</h3>
      <p>As one of the first radio stations in Idaho, KBOI played a pivotal role in the development of broadcasting in the state. The station's powerful signal has allowed it to reach listeners throughout southern Idaho and beyond.</p>
      
      <h3>News and Talk Format</h3>
      <p>Today, KBOI features a news/talk format with a mix of local and nationally syndicated programming. The station's news department provides comprehensive coverage of local, regional, and national events.</p>
      
      <h3>Community Institution</h3>
      <p>Throughout its long history, KBOI has remained a vital community institution, serving as a source of information during emergencies, a forum for public discourse, and a champion for local causes.</p>
    `,
    color: "#2C3E50"
  },
  {
    id: "kbsu",
    name: "KBSU",
    frequency: "90.3 FM",
    format: "Public Radio",
    logo: "/images/stations/kbsu-logo.png",
    description: "KBSU 90.3 FM is Boise State Public Radio's flagship station, offering NPR programming, local news, and cultural content to listeners throughout the Treasure Valley.",
    fullContent: `
      <h3>History of KBSU 90.3 FM</h3>
      <p>KBSU 90.3 FM is the flagship station of Boise State Public Radio, broadcasting from the campus of Boise State University. The station has evolved from a student-run operation to a professional public radio service.</p>
      
      <h3>Public Radio Mission</h3>
      <p>As a member of the NPR network, KBSU provides thoughtful news coverage, cultural programming, and educational content. The station serves as an important source of in-depth journalism and diverse perspectives.</p>
      
      <h3>Local Production</h3>
      <p>In addition to carrying national NPR programs, KBSU produces local news and cultural content that reflects the interests and concerns of the Treasure Valley community.</p>
      
      <h3>Educational Role</h3>
      <p>KBSU continues to serve an educational role, providing opportunities for Boise State students to gain experience in broadcasting while delivering valuable programming to the community.</p>
    `,
    color: "#3498DB"
  },
  {
    id: "kjot",
    name: "KJOT",
    frequency: "105.1 FM",
    format: "Classic Rock",
    logo: "/images/stations/kjot-logo.png",
    description: "KJOT 105.1 FM 'J105' is Boise's classic rock station, playing the greatest rock hits from the 60s through the 90s.",
    fullContent: `
      <h3>History of KJOT 105.1 FM "J105"</h3>
      <p>KJOT 105.1 FM, known as "J105," has been Boise's home for classic rock for decades. The station has built a loyal following among rock music fans throughout the Treasure Valley.</p>
      
      <h3>Classic Rock Format</h3>
      <p>J105 features a classic rock format focusing on the greatest rock hits from the 1960s through the 1990s. The station's playlist includes legendary artists like Led Zeppelin, The Rolling Stones, AC/DC, and many others.</p>
      
      <h3>Rock Culture</h3>
      <p>Beyond just the music, J105 celebrates rock culture through special programming, concert promotions, and events that bring together the rock community in Boise.</p>
      
      <h3>Local Connection</h3>
      <p>While playing classic rock hits, J105 maintains a strong local identity with personalities who understand the Boise market and connect with listeners on a personal level.</p>
    `,
    color: "#E67E22"
  },
  {
    id: "kkgl",
    name: "KKGL",
    frequency: "96.9 FM",
    format: "Classic Rock",
    logo: "/images/stations/kkgl-logo.png",
    description: "KKGL 96.9 FM 'The Eagle' delivers classic rock hits to the Treasure Valley, featuring iconic rock artists from the 70s, 80s, and beyond.",
    fullContent: `
      <h3>History of KKGL 96.9 FM "The Eagle"</h3>
      <p>KKGL 96.9 FM, branded as "The Eagle," is one of Boise's premier classic rock stations. The Eagle has been a fixture in the Treasure Valley radio landscape for many years.</p>
      
      <h3>Rock Legacy</h3>
      <p>The Eagle specializes in classic rock hits from the 1970s and 1980s, with some selections from the 60s and 90s as well. The station celebrates the legacy of rock music that continues to resonate with listeners of all ages.</p>
      
      <h3>Iconic Artists</h3>
      <p>The station's playlist features iconic rock artists like Pink Floyd, Eagles, Fleetwood Mac, Queen, and many others who defined the classic rock era.</p>
      
      <h3>Community Events</h3>
      <p>The Eagle is known for supporting and promoting rock concerts and events in the Boise area, helping to maintain a vibrant rock music scene in the Treasure Valley.</p>
    `,
    color: "#F39C12"
  },
  {
    id: "kzmg",
    name: "KZMG",
    frequency: "102.7 FM",
    format: "Contemporary Hit Radio (CHR)",
    logo: "/images/stations/kzmg-logo.png",
    description: "KZMG 102.7 FM 'My 102.7' plays today's hottest hits and is Boise's go-to station for contemporary pop music.",
    fullContent: `
      <h3>History of KZMG 102.7 FM "My 102.7"</h3>
      <p>KZMG 102.7 FM, branded as "My 102.7," is Boise's Contemporary Hit Radio (CHR) station focusing on current pop hits and chart-topping music.</p>
      
      <h3>Contemporary Format</h3>
      <p>My 102.7 plays the latest hits from today's most popular artists across pop, dance, hip-hop, and R&B genres. The station keeps its finger on the pulse of current music trends.</p>
      
      <h3>Youth Appeal</h3>
      <p>With its contemporary format, My 102.7 appeals primarily to younger listeners and maintains a high-energy, upbeat presentation style that resonates with its audience.</p>
      
      <h3>Entertainment Focus</h3>
      <p>Beyond music, the station covers entertainment news, celebrity gossip, and pop culture, keeping listeners informed about the latest trends and happenings in the entertainment world.</p>
    `,
    color: "#9B59B6"
  },
  {
    id: "kbsx",
    name: "KBSX",
    frequency: "91.5 FM",
    format: "News/Talk",
    logo: "/images/stations/kbsx-logo.png",
    description: "KBSX 91.5 FM is Boise State Public Radio's news service, providing in-depth journalism, NPR programming, and thoughtful discussion of current events.",
    fullContent: `
      <h3>History of KBSX 91.5 FM</h3>
      <p>KBSX 91.5 FM is part of the Boise State Public Radio network, focusing specifically on news and information programming. The station serves as an important source of journalism for the Treasure Valley.</p>
      
      <h3>News Focus</h3>
      <p>KBSX features a news and information format, carrying NPR's flagship news programs like Morning Edition and All Things Considered, along with other national public radio shows.</p>
      
      <h3>Local Journalism</h3>
      <p>The station maintains a team of journalists who cover local and regional issues, producing original reporting that addresses the specific concerns and interests of Idaho residents.</p>
      
      <h3>Public Service</h3>
      <p>As a public radio station, KBSX is committed to serving the community through objective journalism, thoughtful analysis, and programming that promotes civic engagement and understanding.</p>
    `,
    color: "#2980B9"
  },
  {
    id: "kqfc",
    name: "KQFC",
    frequency: "97.9 FM",
    format: "Adult Contemporary",
    logo: "/images/stations/kqfc-logo.png",
    description: "KQFC 97.9 FM 'Magic 97.9' offers adult contemporary music, featuring a mix of current hits and familiar favorites from the 80s to today.",
    fullContent: `
      <h3>History of KQFC 97.9 FM "Magic 97.9"</h3>
      <p>KQFC 97.9 FM, known as "Magic 97.9," serves the Treasure Valley with an Adult Contemporary format that appeals to a broad audience of adult listeners.</p>
      
      <h3>Adult Contemporary Format</h3>
      <p>Magic 97.9 features a mix of current adult pop hits alongside familiar favorites from the 1980s through today. The station focuses on melodic, accessible music that appeals to listeners across multiple generations.</p>
      
      <h3>Workplace Listening</h3>
      <p>With its inoffensive, pleasant music selection, Magic 97.9 has positioned itself as an ideal station for workplace listening, making it popular in offices and businesses throughout the Boise area.</p>
      
      <h3>Community Connection</h3>
      <p>The station maintains strong ties to the community through involvement in local events, charitable initiatives, and programming that reflects the values and interests of Treasure Valley residents.</p>
    `,
    color: "#8E44AD"
  },
  {
    id: "kxlt",
    name: "KXLT",
    frequency: "107.9 FM",
    format: "Hot Adult Contemporary",
    logo: "/images/stations/kxlt-logo.png",
    description: "KXLT 107.9 FM 'Lite FM' plays the best mix of adult contemporary hits from the 80s, 90s, and today.",
    fullContent: `
      <h3>History of KXLT 107.9 FM "Lite FM"</h3>
      <p>KXLT 107.9 FM, branded as "Lite FM," offers a Hot Adult Contemporary format to listeners in the Treasure Valley. The station has established itself as a reliable source for upbeat, familiar music.</p>
      
      <h3>Hot AC Format</h3>
      <p>Lite FM features a Hot Adult Contemporary format that includes current pop hits alongside recurrent favorites from recent decades. The playlist is designed to appeal primarily to adult women.</p>
      
      <h3>Positive Atmosphere</h3>
      <p>The station maintains a positive, uplifting atmosphere with music selections and on-air content that aims to brighten listeners' days and provide an escape from daily stresses.</p>
      
      <h3>Family-Friendly</h3>
      <p>With its focus on mainstream hits and family-friendly content, Lite FM positions itself as a station that parents can enjoy with their children, making it a popular choice for family listening.</p>
    `,
    color: "#16A085"
  },
  {
    id: "kfxd",
    name: "KFXD",
    frequency: "630 AM",
    format: "Sports",
    logo: "/images/stations/kfxd-logo.png",
    description: "KFXD 630 AM 'Sports 630' delivers comprehensive sports coverage, including play-by-play broadcasts, analysis, and sports talk programming.",
    fullContent: `
      <h3>History of KFXD 630 AM "Sports 630"</h3>
      <p>KFXD 630 AM, now known as "Sports 630," is one of the oldest radio stations in Idaho with a history dating back to the early days of radio broadcasting. In recent years, the station has focused on sports programming.</p>
      
      <h3>Sports Focus</h3>
      <p>Sports 630 provides comprehensive coverage of local and national sports, including play-by-play broadcasts of games, sports talk shows, and analysis of sporting events.</p>
      
      <h3>Local Teams</h3>
      <p>The station covers local sports teams, including high school athletics, Boise State University sports, and other regional teams that are important to the Treasure Valley community.</p>
      
      <h3>Legacy Station</h3>
      <p>As one of Idaho's heritage stations, KFXD has played an important role in the state's broadcasting history and continues to serve the community through its sports programming.</p>
    `,
    color: "#27AE60"
  },
  {
    id: "ksas",
    name: "KSAS",
    frequency: "103.5 FM",
    format: "Country",
    logo: "/images/stations/ksas-logo.png",
    description: "KSAS 103.5 FM 'Kiss 103.5' is Boise's country music station, playing the best in contemporary country hits.",
    fullContent: `
      <h3>History of KSAS 103.5 FM "Kiss 103.5"</h3>
      <p>KSAS 103.5 FM, branded as "Kiss 103.5," serves the Treasure Valley with contemporary country music. The station has established itself as a popular choice for country music fans in the Boise area.</p>
      
      <h3>Country Format</h3>
      <p>Kiss 103.5 features a contemporary country format, playing current hits from today's most popular country artists alongside recent favorites from the past decade.</p>
      
      <h3>Country Lifestyle</h3>
      <p>Beyond just music, the station celebrates country lifestyle and values, connecting with listeners who identify with country culture and the western way of life that is important in Idaho.</p>
      
      <h3>Concert Promotion</h3>
      <p>Kiss 103.5 is actively involved in promoting country music concerts and events in the Treasure Valley, helping to bring major country artists to the area and supporting the local country music scene.</p>
    `,
    color: "#D35400"
  },
  {
    id: "krbx",
    name: "KRBX",
    frequency: "89.9 FM",
    format: "Community Radio",
    logo: "/images/stations/krbx-logo.png",
    description: "KRBX 89.9 FM 'Radio Boise' is a community radio station offering diverse, locally-produced programming that reflects the unique character of the Treasure Valley.",
    fullContent: `
      <h3>History of KRBX 89.9 FM "Radio Boise"</h3>
      <p>KRBX 89.9 FM, known as "Radio Boise," is a community radio station that began broadcasting in 2011 after years of planning and development by dedicated community members.</p>
      
      <h3>Community Focus</h3>
      <p>Radio Boise operates as a true community radio station, with programming created by and for local residents. The station provides a platform for voices, music, and perspectives that might not be heard on commercial radio.</p>
      
      <h3>Diverse Programming</h3>
      <p>The station features an eclectic mix of music shows spanning numerous genres, along with public affairs programming, cultural content, and special features that reflect the diversity of the Boise community.</p>
      
      <h3>Volunteer-Powered</h3>
      <p>Radio Boise relies heavily on volunteers who create and produce much of its programming, embodying the grassroots, community-oriented spirit that defines the station.</p>
    `,
    color: "#1ABC9C"
  },
  {
    id: "kspd",
    name: "KSPD",
    frequency: "790 AM",
    format: "Religious",
    logo: "/images/stations/kspd-logo.png",
    description: "KSPD 790 AM provides religious programming, including sermons, Bible teachings, and faith-based content to listeners in the Treasure Valley.",
    fullContent: `
      <h3>History of KSPD 790 AM</h3>
      <p>KSPD 790 AM serves the Treasure Valley with religious programming, providing spiritual content to listeners seeking faith-based radio.</p>
      
      <h3>Religious Format</h3>
      <p>The station features a variety of religious programming, including sermons, Bible teachings, Christian talk shows, and religious music designed to inspire and encourage listeners in their faith.</p>
      
      <h3>Ministry Focus</h3>
      <p>KSPD operates with a ministry mindset, seeking to serve the spiritual needs of its audience through content that addresses religious topics and provides guidance based on Christian principles.</p>
      
      <h3>Community Service</h3>
      <p>The station supports various religious organizations and charitable initiatives in the community, serving as a connection point for faith-based activities and events in the Treasure Valley.</p>
    `,
    color: "#34495E"
  },
  {
    id: "kthi",
    name: "KTHI",
    frequency: "107.1 FM",
    format: "Country",
    logo: "/images/stations/kthi-logo.png",
    description: "KTHI 107.1 FM 'K-Hits' delivers classic country hits from the 70s, 80s, and 90s to country music fans throughout the Treasure Valley.",
    fullContent: `
      <h3>History of KTHI 107.1 FM "K-Hits"</h3>
      <p>KTHI 107.1 FM, branded as "K-Hits," serves the Treasure Valley with a classic country format that celebrates the rich heritage of country music.</p>
      
      <h3>Classic Country</h3>
      <p>K-Hits focuses on country music from the 1970s through the 1990s, playing the legendary artists and songs that defined country music during these decades.</p>
      
      <h3>Traditional Appeal</h3>
      <p>With its focus on traditional country sounds, K-Hits appeals to listeners who appreciate the authentic, storytelling nature of classic country music and the artists who pioneered the genre.</p>
      
      <h3>Idaho Connection</h3>
      <p>The station celebrates Idaho's strong connection to country music and western culture, reflecting the values and lifestyle that are important to many residents of the Treasure Valley.</p>
    `,
    color: "#7F8C8D"
  },
  {
    id: "ksrv",
    name: "KSRV",
    frequency: "96.1 FM",
    format: "Classic Hits",
    logo: "/images/stations/ksrv-logo.png",
    description: "KSRV 96.1 FM 'The Bull' plays classic hits from the 70s, 80s, and 90s for listeners throughout the Treasure Valley.",
    fullContent: `
      <h3>History of KSRV 96.1 FM "The Bull"</h3>
      <p>KSRV 96.1 FM, known as "The Bull," serves the Treasure Valley with a classic hits format that celebrates the most popular songs from recent decades.</p>
      
      <h3>Classic Hits Format</h3>
      <p>The Bull features hits primarily from the 1970s, 1980s, and 1990s, focusing on songs that have stood the test of time and remain popular with adult listeners.</p>
      
      <h3>Nostalgic Appeal</h3>
      <p>The station taps into musical nostalgia, playing songs that evoke memories and emotional connections for listeners who grew up during these decades.</p>
      
      <h3>Broad Appeal</h3>
      <p>With its familiar playlist of proven hits, The Bull appeals to a broad demographic of adult listeners, making it a popular choice for family listening and social gatherings.</p>
    `,
    color: "#2C3E50"
  },
  {
    id: "kawo",
    name: "KAWO",
    frequency: "104.3 FM",
    format: "Classic Hits",
    logo: "/images/stations/kawo-logo.png",
    description: "KAWO 104.3 FM 'Wow Country' delivers the best in contemporary country music to listeners throughout the Treasure Valley.",
    fullContent: `
      <h3>History of KAWO 104.3 FM "Wow Country"</h3>
      <p>KAWO 104.3 FM, branded as "Wow Country," is one of the Treasure Valley's premier country music stations, serving listeners with contemporary country hits.</p>
      
      <h3>Contemporary Country</h3>
      <p>Wow Country focuses on current country hits and recent favorites, playing the most popular artists in today's country music scene alongside established stars from the past decade.</p>
      
      <h3>Idaho Country Lifestyle</h3>
      <p>The station celebrates Idaho's strong connection to country music and rural lifestyle, reflecting the values and interests of many Treasure Valley residents.</p>
      
      <h3>Event Promotion</h3>
      <p>Wow Country is actively involved in promoting country music concerts and events in the area, helping to bring major country artists to Boise and supporting the local country music community.</p>
    `,
    color: "#E74C3C"
  }
];

export default stationData;