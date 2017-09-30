import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private client = algoliasearch('Y12SKP305C', 'b649feb96518fcffab60eee83ab77d7c');
  private helper = algoliasearchHelper(this.client, 'companies');

  private companies: any[];
  private searchKeywords: string;
  private hitCount: number;

  constructor(public navCtrl: NavController) {
    this.helper.on('result', (result) => {
      if (this.searchKeywords === '') {
        this.companies = null;
        this.hitCount = 0;
      } else {
        console.log(result);
        this.companies = result.hits;
        this.hitCount = result.nbHits;
      }
    });
  }

  ionViewDidLoad() {
    this.hitCount = 0;
  }

  updateList() {
    this.helper.setQuery(this.searchKeywords).search();
  }
}
