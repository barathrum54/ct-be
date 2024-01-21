import { IgApiClient } from 'instagram-private-api';
import IGUser from '../models/igUser.js';
import SocksProxyAgent from 'socks-proxy-agent';
import { getRandomProxy } from '../utils/proxyHelper.js';
export class InstagramService {
  ig = null;
  useProxy = null;
  constructor() {
    this.ig = new IgApiClient();
    this.useProxy = false;
  }
  async setProxy(proxyUrl) {
    // If needed, set the agent for the proxy

    this.ig.request.defaults.agentClass = SocksProxyAgent;
    let [ip, port] = proxyUrl.split(':');
    this.ig.state.proxyUrl = "socks5://pfcmjxmo:qrzwds310cr2@185.199.231.45:8382";
    this.ig.request.defaults.agentOptions = {
      hostname: "185.199.231.45", // Corrected property name
      port: 8382,
      protocol: 'socks5:',
      username: 'pfcmjxmo',
      password: 'qrzwds310cr2',

    };
    console.log(this.ig.request.defaults);
  }

  async loginToInstagram(email, password) {
    if (!email || !password) throw new Error('Email and password are required');
    try {
      this.ig.state.generateDevice(email);
      if (this.useProxy) {
        const randomProxy = await getRandomProxy();
        await this.setProxy(randomProxy);
      }
      await this.ig.account.login(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(username) {
    const user = await this.ig.user.searchExact(username);
    const userFeed = this.ig.feed.user(user.pk);
    return await userFeed.items();
  }

  async indexInstagramUser(user) {
    const userPosts = await this.getUserPosts(user.username);
    const igUserData = new IGUser({
      username: user.username,
      profile_picture: user.profile_pic_url,
      follower_count: user.follower_count,
      following_count: user.following_count,
      bio_text: user.biography,
      is_private: user.is_private,
      posts: userPosts.map(post => ({
        id: post.id,
        imageUrl: post.image_versions2?.candidates?.[0]?.url,
      }))
    });
    return igUserData.save();
  }

  async getUserProfile(username) {
    return await this.ig.user.searchExact(username);
  }

  async getCurrentUserData() {
    return await this.ig.account.currentUser();
  }

  async getCurrentUserFriends() {
    const followers = [];
    const following = [];

    const followersFeed = this.ig.feed.accountFollowers(this.ig.state.cookieUserId);
    let followersPage = await followersFeed.items();
    followers.push(...followersPage);
    while (followersFeed.isMoreAvailable()) {
      followersPage = await followersFeed.items();
      followers.push(...followersPage);
    }

    const followingFeed = this.ig.feed.accountFollowing(this.ig.state.cookieUserId);
    let followingPage = await followingFeed.items();
    following.push(...followingPage);
    while (followingFeed.isMoreAvailable()) {
      followingPage = await followingFeed.items();
      following.push(...followingPage);
    }

    return { followers, following };
  }
}
