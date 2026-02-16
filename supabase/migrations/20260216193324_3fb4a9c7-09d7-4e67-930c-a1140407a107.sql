
-- Fix search_path on validation function
CREATE OR REPLACE FUNCTION public.validate_bundle_inquiry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF jsonb_typeof(NEW.selected_products) != 'array' THEN
    RAISE EXCEPTION 'selected_products must be an array';
  END IF;
  
  IF jsonb_array_length(NEW.selected_products) > 50 THEN
    RAISE EXCEPTION 'Too many products selected';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Tighten INSERT policy to only allow anonymous role explicitly
DROP POLICY IF EXISTS "Allow anonymous inserts" ON bundle_inquiries;
CREATE POLICY "Allow anonymous inserts"
  ON bundle_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);
