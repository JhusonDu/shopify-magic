
-- Add database constraints for input validation
ALTER TABLE bundle_inquiries
  ADD CONSTRAINT name_length CHECK (length(name) > 0 AND length(name) <= 100),
  ADD CONSTRAINT email_length CHECK (length(email) > 0 AND length(email) <= 255),
  ADD CONSTRAINT email_format CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  ADD CONSTRAINT size_valid CHECK (selected_size IN ('5ml', '10ml', '3x10ml', '3x50ml'));

-- Add validation trigger for JSONB selected_products
CREATE OR REPLACE FUNCTION public.validate_bundle_inquiry()
RETURNS TRIGGER AS $$
BEGIN
  IF jsonb_typeof(NEW.selected_products) != 'array' THEN
    RAISE EXCEPTION 'selected_products must be an array';
  END IF;
  
  IF jsonb_array_length(NEW.selected_products) > 50 THEN
    RAISE EXCEPTION 'Too many products selected';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_inquiry_before_insert
  BEFORE INSERT ON bundle_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_bundle_inquiry();
