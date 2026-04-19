-- Run this in Supabase SQL Editor

-- Site settings table (for admin panel to edit website content)
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone default now()
);

-- Default content
insert into site_settings (key, value) values
  ('logo_url', ''),
  ('hero_heading', 'Our Children,'),
  ('hero_heading_italic', 'Our Legacy'),
  ('hero_subtext', 'Transforming a derelict 6,000m² site into a world-class educational and community hub.'),
  ('about_paragraph1', 'The Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation is a Charitable Incorporated Organisation founded in 2021.'),
  ('about_paragraph2', 'With the generous support of our community, we have already acquired a significant 6,000m² site.'),
  ('phone', '(+44) 07450 375304'),
  ('email', 'Admin@hsmzf.org'),
  ('progress_percent', '38'),
  ('hero_image_url', ''),
  ('about_image1_url', ''),
  ('about_image2_url', ''),
  ('project_image1_url', ''),
  ('project_image2_url', ''),
  ('project_image3_url', '')
on conflict (key) do nothing;

-- Security
alter table site_settings enable row level security;

create policy "Public can read settings"
  on site_settings for select to anon using (true);

create policy "Public can update settings"
  on site_settings for update to anon using (true);

create policy "Public can insert settings"
  on site_settings for insert to anon with check (true);

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('hsmzf-images', 'hsmzf-images', true)
on conflict (id) do nothing;

create policy "Public can upload images"
  on storage.objects for insert to anon
  with check (bucket_id = 'hsmzf-images');

create policy "Public can read images"
  on storage.objects for select to anon
  using (bucket_id = 'hsmzf-images');
