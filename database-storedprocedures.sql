-- stored procedure and trigger to insert the base category 
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

-- stored procedure and trigger to insert the base item 
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

-- stored procedure and trigger to add categories
-- in store_category for new store
CREATE OR REPLACE FUNCTION rec_insert_store_categories()
  RETURNS trigger AS
$$
BEGIN
         INSERT INTO store_category(store_id, category_id, rank)
         SELECT NEW.id, category.id, category.id
         FROM category 
         WHERE category.person_id = NEW.person_id;
 
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
-- trigger after new store created
CREATE TRIGGER ins_store_categories
  AFTER INSERT
  ON store
  FOR EACH ROW
  EXECUTE PROCEDURE rec_insert_store_categories();
