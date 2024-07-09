import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

class LeagueOneApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${LeagueOneApi.token}` };

    try {
      return (await axios({ url, method, data, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Auth Routes
  static async registerUser(data) {
    let res = await this.request('auth/register', data, 'post');
    return res;
  }

  static async loginUser(data) {
    let res = await this.request('auth/login', data, 'post');
    return res;
  }

  // League Routes
  static async getLeagues(filters) {
    let res = await this.request('leagues', { params: filters });
    return res;
  }

  static async getLeagueById(id) {
    let res = await this.request(`leagues/${id}`);
    return res;
  }

  static async createLeague(data) {
    let res = await this.request('leagues/create', data, 'post');
    return res;
  }

  static async joinLeague(leagueId, data) {
    let res = await this.request(`leagues/${leagueId}/join`, data, 'post');
    return res;
  }

  static async updateLeague(id, data) {
    let res = await this.request(`leagues/${id}`, data, 'put');
    return res;
  }

  static async deleteLeague(id) {
    let res = await this.request(`leagues/${id}`, {}, 'delete');
    return res;
  }

  // Match Routes
  static async getMatches(leagueId, filters = {}) {
    let res = await this.request(`leagues/${leagueId}/matches`, { params: filters });
    return res;
  }


  static async createMatch(leagueId, data) {
    let res = await this.request(`leagues/${leagueId}/matches/create`, data, 'post');
    return res;
  }

  static async updateMatch(leagueId, matchId, data) {
    let res = await this.request(`leagues/${leagueId}/matches/${matchId}`, data, 'put');
    return res;
  }

  static async deleteMatch(leagueId, matchId) {
    let res = await this.request(`leagues/${leagueId}/matches/${matchId}`, {}, 'delete');
    return res;
  }

  // Team Routes
  static async getTeams(filters) {
    let res = await this.request('teams', { params: filters });
    return res;
  }

  static async getTeamById(id) {
    let res = await this.request(`teams/${id}`);
    return res;
  }

  static async createTeam(data) {
    let res = await this.request('teams/create', data, 'post');
    return res;
  }

  static async joinTeam(teamId, data) {
    let res = await this.request(`teams/${teamId}/join`, data, 'post');
    return res;
  }

  static async updateTeam(id, data) {
    let res = await this.request(`teams/${id}`, data, 'put');
    return res;
  }

  static async deleteTeam(id) {
    let res = await this.request(`teams/${id}`, {}, 'delete');
    return res;
  }

  // User Routes
  static async getUsers(filters) {
    let res = await this.request('users', { params: filters });
    return res;
  }

  static async getUserByUsername(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  static async createUser(data) {
    let res = await this.request('users/create', data, 'post');
    return res;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'put');
    return res;
  }

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  }
}

export default LeagueOneApi;
