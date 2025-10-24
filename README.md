# Open Protocols Hub

Your social life in the digital world — under your control.

## Description

**Open Protocols Hub** is a software project built on the premise of giving users the ability to connect freely with others — independently from the large corporations that currently control the major social media platforms.  
Instead of *“being a client”* of those entities, Open Protocols Hub grants you **total and irrevocable control** over managing your digital life with true freedom — limited only by what **you, and you alone**, decide.

To achieve this, Open Protocols Hub relies on several free and open technologies that enable a **self-sufficient and fully decentralized** type of social network, where each user has absolute control over their own profile.  
These technologies are: the **Nostr Protocol**, the **BitTorrent Protocol**, and **Bitcoin**.  
Later on, I will explain the role of each of them and how, united by a philosophy of individual freedom and the *open source* spirit, they form the mechanisms that will bring to life a tool designed to free users from algorithms whose purpose is to addict people to shallow, non-consensual content.  
Here, **you** will be in control of what truly matters to you.

---

## Standing on the Shoulders of Giants

In this section, I will explain a bit about the main mechanisms that make Open Protocols Hub possible.

Before anything else, I would like to express my gratitude to the *open source* universe.  
When I began creating the prototype for this project, I found countless ready-made code libraries, open standards, and open protocols — as well as a philosophy of freedom and passion for sharing knowledge.  
I realized I had found a space full of people who, even if I may never meet them personally, I can consider **friends**, because they share the same vision of a free digital world.

---

### First Gear – The Nostr Protocol

One of the fundamental principles of Open Protocols Hub is that **users must have full control over their profiles**, since, in the end, those profiles represent an extension of the self — even in the digital realm.  
Therefore, they must be treated as something **intrinsically personal**.

The **Nostr Protocol** was chosen precisely for that reason: it gives the user complete control over their own profile.  
The idea is that Open Protocols Hub functions as a **Nostr client** (a profile management software), but goes further by integrating other technologies and innovative concepts to create a broader ecosystem.

One of the critical issues Open Protocols Hub aims to solve is the **need to expose the user’s private key** in order to manage their profile — which I consider one of the biggest problems of current Nostr clients.  
Below, I briefly explain how the project addresses this:

1. **Profile creation:**  
   Open Protocols Hub will follow Nostr’s standards for creating profiles using public and private keys.

2. **Offline profile management:**  
   One of Open Protocols Hub’s innovations will be the ability to manage your profile **offline**, without losing usability.  
   There will be two modes of operation:  
   - In online mode, the user will use only their **public key**, allowing a “read-only” type of access, without the ability to modify the profile.  
   - All actions performed (such as creating posts, liking, or editing the profile) will be recorded in a special file.  
   This file can then be taken to a **secure offline environment** (for example, a USB drive running the **Tails** system), where the user — with their **private key** — can safely review and digitally sign all actions.  
   Afterwards, the signed file can be sent back to the online environment, and Open Protocols Hub will broadcast the events to the configured *relays*.  

   Although this process may seem more complex than a simple “login,” it restores to you the **responsibility and control** over your digital identity.

---

### Second Gear – The BitTorrent Protocol

Considering that Nostr proposes a **decentralized and censorship-resistant** network, I noticed a recurring issue in some Nostr clients:  
when including images in posts, the content is not embedded directly, since the protocol only supports text.  
Clients usually store images on external servers and attach a link to the post, creating a **false sense** that the content is truly integrated.  
This undermines the principles of decentralization, since there are no guarantees that those servers will remain available, nor that they won’t be forced to delete the files.

To solve this, Open Protocols Hub will use the **BitTorrent protocol**, which shares the same philosophy of decentralization.  
However, its implementation will have a specific design:

1. **The user as the main server:**  
   When creating a post containing any type of media, Open Protocols Hub will generate a **torrent** with all non-text files and store them locally.  
   The post will contain a reference to that torrent, allowing followers to automatically download the media content.  
   If they wish, they can also redistribute it, naturally expanding the reach of the content.  

   This model eliminates the need for centralized servers, replacing them with a voluntary collaboration network among users.  
   Moreover, each person can define personalized rules, such as:
   - Sharing only media from posts they liked;  
   - Limiting how many times a file is shared;  
   - Setting a maximum disk usage limit, among other options.

---

### Third Gear – Bitcoin

You’ve probably heard the saying:  
> “If you’re not paying for the product, you are the product.”

This statement perfectly sums up what I consider the most harmful aspect of large private social networks.  
The user becomes a **source of profit** to be exploited, and to achieve that, addictive algorithms and recommendation systems are employed to capture and control people’s attention.  

Open Protocols Hub seeks to break those invisible chains by implementing **Bitcoin** as the ecosystem’s currency of value.  
This allows content creators to receive **direct financial support from their followers**, without intermediaries — fostering a natural and independent funding model.  
Users, in turn, can support what they truly value.

---

### Open Source Philosophy

As I mentioned earlier, I am deeply grateful to the *open source* universe.  
Through it, I discovered a community of people passionate about technology and freedom.  
Being able to use and audit open technologies is fascinating, and that’s why Open Protocols Hub’s code will be **public**.  

I want everyone to understand how it works and verify that its sole purpose is to provide **digital freedom** — the freedom to connect with what you love without depending on centralized networks, governments, or authoritarian leaders.  

This is a **completely free** tool.  
Use it as you wish.

## Open Protocols Hub License

The Open Protocols Hub source code is **public for auditing and transparency purposes only**,
but **may not be redistributed or modified without authorization** from the author.

- Author: O Profeta (OpenTI)
- License: OpenTI Public Source License v1.0
- Commercial use: permitted
- Distribution of modified copies: only with authorization
- Use of names and trademarks: allowed for descriptive purposes only, not promotional

The software is provided **"as is"**, without any warranties.