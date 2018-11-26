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

-- stored procedure to insert the base category 
-- rows into the category table for the new user
CREATE OR REPLACE FUNCTION rec_insert_cat()
  RETURNS trigger AS
$$
BEGIN
         INSERT INTO category(name,person_id)
         SELECT base_category.name, NEW.id
         FROM base_category;
 
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

-- trigger after new user created
CREATE TRIGGER ins_person_cat
  AFTER INSERT
  ON person
  FOR EACH ROW
  EXECUTE PROCEDURE rec_insert_cat();

-- stored procedure to insert the base item 
-- rows into the item table for the new user
CREATE OR REPLACE FUNCTION rec_insert_item()
  RETURNS trigger AS
$$
BEGIN
         INSERT INTO item(category_id, name, person_id)
         SELECT category.id, base_item.name, NEW.id
         FROM base_item JOIN base_category ON
         base_item.category_id = base_category.id
         JOIN category ON category.name = base_category.name
         WHERE category.person_id = NEW.id;
 
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

-- trigger after new user created
CREATE TRIGGER ins_person_item
  AFTER INSERT
  ON person
  FOR EACH ROW
  EXECUTE PROCEDURE rec_insert_item();

-- stored procedure and trigger
-- for store_category for new store
CREATE SEQUENCE OrderSequence;

CREATE OR REPLACE FUNCTION rec_insert_store_categories()
  RETURNS trigger AS
$$
BEGIN
         INSERT INTO store_category(store_id, category_id, order)
         SELECT NEW.id, category.id, nextval('OrderSequence')
         FROM category 
         WHERE category.person_id = NEW.id;
 
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER ins_store_categories
  AFTER INSERT
  ON store
  FOR EACH ROW
  EXECUTE PROCEDURE rec_insert_store_categories();

--

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