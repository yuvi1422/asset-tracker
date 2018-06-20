import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransactionService } from './transaction.service';

describe('Service: Transaction Service', () => {

    let transactionServiceSpy: TransactionService;

    beforeEach(async(() => {
      transactionServiceSpy = new TransactionService();
    }));

    it('#getBean() should get Transaction bean', () => {
      const expectedData = {
        accountability: {
          icon: 'assets/avatar/people/person.ico',
          title: 'Select Contact',
          price: 0,
          transactions: []
        }
      };

      expect(transactionServiceSpy.getBean().accountability).toEqual(expectedData.accountability);
    });
}); 