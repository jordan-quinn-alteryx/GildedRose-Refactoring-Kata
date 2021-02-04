import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  describe('Item', () => {
    it('can be instantiated with a name, sellIn, and quality', () => {
      const item = new Item('slim shady', 5, 10);
      expect(item.name).to.equal('slim shady');
      expect(item.sellIn).to.equal(5);
      expect(item.quality).to.equal(10);
    })
  })
  describe('GuildedRose', () => {
    it('can be instantiated with items', () => {
      const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
      expect(gildedRose.items).to.exist;
      expect(gildedRose.items[0].name).to.equal('foo');
    })
    describe('updateQuality', () => {
      it('should degrade quality by 1 on each invocation for most items', () => {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
      })
      it('should degrade sellIn by 1 on each invocation for most items', () => {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
      })
      it('will not degrade quality below zero', () => {
        const gildedRose = new GildedRose([ new Item('foo', 5, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      })
      it('will degrade quality by 2 when sellIn is less than 0', () => {
        const gildedRose = new GildedRose([ new Item('foo', 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
      })
      describe('Aged Brie', () => {
        it('should increase quality by 1 as sellIn decreases by 1', () => {
          const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 5)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(6);
          expect(items[0].sellIn).to.equal(4);
        })
        it('will never allow an item to have quality of more than 50', () => {
          const gildedRose = new GildedRose([ new Item('Aged Brie', 5, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(50);
        })
        it('should increase quality by 2 if sellIn is < 0', () => {
          const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 10)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(12);
        })
        it('should not increase quality by 2 if sellIn is < 0 and quality is already 50', () => {
          const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(50);
        })
      })
      describe('Sulfuras, Hand of Ragnaros', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 5, 50);
        it('does not degrade in quality evaaar', () => {
          const gildedRose = new GildedRose([item]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(50);
        })
        it('does not decrease sellIn', () => {
          const gildedRose = new GildedRose([item]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).to.equal(5);
        })
      })
      describe('Backstage passes to a TAFKAL80ETC concert', () => {
        it('should increase in quality by 1 if there are > 10 days until the concert', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 15)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(16);
        })
        it('should increase in quality by 2 if there are between 6 and 10 days until the concert', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 15)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(17);
        })
        it('should increase in quality by 3 if there are < 6 days until the concert', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 15)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(18);
        })
        it('should jump to zero quality if the sellIn value reaches zero', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 15)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(0);
        })
        it('should increase quality to a max of 50', () => {
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 49)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).to.equal(50);
        })
      })
    })
  })
});
