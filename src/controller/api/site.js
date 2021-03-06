const Base = require('./base');
module.exports = class extends Base {
  async getAction() {
    const {page, pagesize} = this.get();

    let siteIds = await this.model('site_user').where({
      user_id: this.userInfo.id
    }).select();
    if (think.isEmpty(siteIds)) {
      siteIds = [ null ];
    } else {
      siteIds = siteIds.map(({site_id}) => site_id);
    }

    if (this.id) {
      this.id = parseInt(this.id);
      if (!siteIds.includes(this.id)) {
        return this.fail('SITE PERMISSION DENY');
      }

      const siteInfo = await this.modelInstance.where({id: this.id}).find();
      return this.success(siteInfo);
    }

    this.modelInstance = this.modelInstance.where({
      id: ['IN', siteIds]
    });

    let result;
    if (page) {
      result = await this.modelInstance.page([page, pagesize]).countSelect();
    } else {
      result = await this.modelInstance.select();
    }
    return this.success(result);
  }

  async postAction() {
    const data = this.post();

    // check site
    const site = await this.modelInstance.where({
      url: data.url
    }).find();
    if (!think.isEmpty(site)) {
      return this.fail('SITE_EXIST');
    }

    data.user = [this.userInfo.id];
    const insertId = await this.modelInstance.addSite(data);
    return this.success(insertId);
  }

  async putAction() {
    if (!this.id) {
      return this.fail('SITE ID MISS');
    }

    const {name} = this.post();
    if (!name) {
      return this.success();
    }

    await this.modelInstance.where({id: this.id}).update({name});
    return this.success();
  }

  async deleteAction() {
    if (!this.id) {
      return this.fail('SITE ID MISS');
    }
    this.id = parseInt(this.id);

    let siteIds = await this.model('site_user').where({
      user_id: this.userInfo.id
    }).select();
    if (think.isEmpty(siteIds)) {
      siteIds = [ null ];
    } else {
      siteIds = siteIds.map(({site_id}) => site_id);
    }

    if (!siteIds.includes(this.id)) {
      return this.fail('SITE PERMISSION DENY');
    }

    return this.modelInstance.where({id: this.id}).delete();
  }
};
