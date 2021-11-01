import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { CoreService } from './_services';

interface ILeader {
  politicalLeaderId: number,
  politicalPartyId: number,
  leaderName: string,
  leaderState: string,
  politicalparty: any
}
interface IDevelopment {
  politicalLeaderId: number,
  leaderName: string,
  leaderState: string,
  politicalPartyId: number,
  developmentId: number,
  activity: string,
  activityMonth: number,
  activityYear: number,
  budget: string,
  state: string,
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private subscriptions: Subscription = new Subscription();
  isLeadersLoading: boolean = true;
  isDevelomentsLoading: boolean = false;
  leadersList: Array<ILeader> = [];
  selectedLeader: ILeader = null;
  developmentsList: Array<IDevelopment> = [];
  title: any;

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.coreService.getLeadersList()
        .subscribe((response: Array<ILeader>) => this.leadersList = response)
        .add(() => this.isLeadersLoading = false)
    )
  }

  getProductData(): void {
    this.isDevelomentsLoading = true;
    this.subscriptions.add(
      this.coreService.getLeaderDevelopments(this.selectedLeader.politicalLeaderId)
        .subscribe((response: Array<IDevelopment>) => this.developmentsList = response)
        .add(() => this.isDevelomentsLoading = false)
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
