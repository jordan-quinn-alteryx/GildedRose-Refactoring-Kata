export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        // Loop for each item in the list 
        for (let i = 0; i < this.items.length; i++) {
            // If not aged brie and not backstage passes (this is the majority of the cases)
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                // If our quality is above 0
                if (this.items[i].quality > 0) {
                    // and it's not Sulfuras, Hand of Ragnaros
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        // then degrade the quality
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
                // If it is aged brie or backstage passes
            } else {
                // if quality less than 50, the quality improves for aged brie and backstage passes
                if (this.items[i].quality < 50) {
                    // increase quality by 1
                    this.items[i].quality = this.items[i].quality + 1
                    // If the item is a backstage pass
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        // If we have less than 11 days to sell the backstage pass
                        if (this.items[i].sellIn < 11) {
                            // and we once again have a quality than 50
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        // If we have 5 days, increase quality by 3
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                // reduce quality a second time
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    // We're dealing with Aged Brie, here
                    if (this.items[i].quality < 50) {
                        // bump quality a second time for brie
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
