CREATE TABLE "base_category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80)
);

INSERT INTO "base_category" ("name")
VALUES ('Dairy'), ('Refridgerated'), ('Produce'), ('Meat'), ('Seafood'), ('Deli'), ('Baking'),
('Frozen'), ('Snacks'), ('Condiments'), ('Rice/Grains'), ('Canned Goods'),
('Spices/Oils'), ('Breakfast'), ('Coffee/Tea'), ('Beverages'), ('Baked Goods'), 
('Cheese'), ('Personal Care'), ('Cleaning Supplies'), ('Kitchen Supplies'), ('Pet Care')

CREATE TABLE "base_item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"category_id" INT REFERENCES base_category
)

-- import common-grocery-items.csv into base_item table

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "category" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"person_id" int REFERENCES person
);

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"category_id" int REFERENCES category,
	"name" VARCHAR (80) NOT NULL,
	"brand_name" VARCHAR (80),
	"person_id" int REFERENCES person
);

CREATE TABLE "store" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"location" VARCHAR (80),
	"person_id" int REFERENCES person
);

CREATE TABLE "store_category" (
	"id" SERIAL PRIMARY KEY,
	"store_id" int REFERENCES store ON DELETE CASCADE,
	"category_id" int REFERENCES category ON DELETE CASCADE,
	"order" int
);

CREATE TABLE "shopping_list" (
	"id" SERIAL PRIMARY KEY,
	"item_id" int REFERENCES item,
	"quantity" int,
	"found" boolean DEFAULT false,
	"person_id" int REFERENCES person
);

-- select shopping_list.*, item.name as item, item.brand_name from shopping_list
-- join item on shopping_list.item_id = item.id
-- join store_category on item.category_id = store_category.category_id
-- where store_category.store_id = 2
-- order by store_category.order