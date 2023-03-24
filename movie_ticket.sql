PGDMP     !                     {           movie_ticket    14.5    14.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16601    movie_ticket    DATABASE     p   CREATE DATABASE movie_ticket WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE movie_ticket;
                postgres    false            �            1259    16657    tbl_categories    TABLE     a   CREATE TABLE public.tbl_categories (
    cate_id integer,
    cate_name character varying(50)
);
 "   DROP TABLE public.tbl_categories;
       public         heap    postgres    false            �            1259    16652 
   tbl_movies    TABLE     Y  CREATE TABLE public.tbl_movies (
    movie_id integer,
    movie_name character varying(50),
    movie_desc character varying(550),
    movie_cover character varying(50),
    movie_link character varying(50),
    movie_release_date character varying(50),
    movie_view integer,
    cate_id integer,
    price_id integer,
    theater integer
);
    DROP TABLE public.tbl_movies;
       public         heap    postgres    false            �            1259    16649 	   tbl_price    TABLE     u   CREATE TABLE public.tbl_price (
    price_id integer,
    movie_price character varying(50),
    movie_id integer
);
    DROP TABLE public.tbl_price;
       public         heap    postgres    false            �            1259    16660    tbl_role    TABLE     d   CREATE TABLE public.tbl_role (
    role_id integer NOT NULL,
    role_name character varying(50)
);
    DROP TABLE public.tbl_role;
       public         heap    postgres    false            �            1259    16700    tbl_tickets    TABLE     1  CREATE TABLE public.tbl_tickets (
    tickets_id integer,
    seatno character varying(100),
    showtimes character varying(50),
    discount character varying(50),
    price_id integer,
    totalprice character varying(50),
    user_id integer,
    movie_id integer,
    remark character varying(50)
);
    DROP TABLE public.tbl_tickets;
       public         heap    postgres    false            �            1259    16666 	   tbl_users    TABLE     
  CREATE TABLE public.tbl_users (
    user_id bigint NOT NULL,
    firstname character varying(200) NOT NULL,
    lastname character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    role_id integer
);
    DROP TABLE public.tbl_users;
       public         heap    postgres    false            �            1259    16665    tbl_users_user_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.tbl_users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.tbl_users_user_id_seq;
       public          postgres    false    214                       0    0    tbl_users_user_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.tbl_users_user_id_seq OWNED BY public.tbl_users.user_id;
          public          postgres    false    213            p           2604    16669    tbl_users user_id    DEFAULT     v   ALTER TABLE ONLY public.tbl_users ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_users_user_id_seq'::regclass);
 @   ALTER TABLE public.tbl_users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    214    213    214                      0    16657    tbl_categories 
   TABLE DATA           <   COPY public.tbl_categories (cate_id, cate_name) FROM stdin;
    public          postgres    false    211                    0    16652 
   tbl_movies 
   TABLE DATA           �   COPY public.tbl_movies (movie_id, movie_name, movie_desc, movie_cover, movie_link, movie_release_date, movie_view, cate_id, price_id, theater) FROM stdin;
    public          postgres    false    210   r                 0    16649 	   tbl_price 
   TABLE DATA           D   COPY public.tbl_price (price_id, movie_price, movie_id) FROM stdin;
    public          postgres    false    209   H,                 0    16660    tbl_role 
   TABLE DATA           6   COPY public.tbl_role (role_id, role_name) FROM stdin;
    public          postgres    false    212   e,       	          0    16700    tbl_tickets 
   TABLE DATA              COPY public.tbl_tickets (tickets_id, seatno, showtimes, discount, price_id, totalprice, user_id, movie_id, remark) FROM stdin;
    public          postgres    false    215   �,                 0    16666 	   tbl_users 
   TABLE DATA           [   COPY public.tbl_users (user_id, firstname, lastname, email, password, role_id) FROM stdin;
    public          postgres    false    214   ,-                  0    0    tbl_users_user_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tbl_users_user_id_seq', 1, false);
          public          postgres    false    213            r           2606    16664    tbl_role tbl_role_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.tbl_role
    ADD CONSTRAINT tbl_role_pkey PRIMARY KEY (role_id);
 @   ALTER TABLE ONLY public.tbl_role DROP CONSTRAINT tbl_role_pkey;
       public            postgres    false    212            t           2606    16675    tbl_users tbl_users_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.tbl_users DROP CONSTRAINT tbl_users_email_key;
       public            postgres    false    214            v           2606    16673    tbl_users tbl_users_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_pkey PRIMARY KEY (user_id);
 B   ALTER TABLE ONLY public.tbl_users DROP CONSTRAINT tbl_users_pkey;
       public            postgres    false    214            w           2606    16676     tbl_users tbl_users_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tbl_users
    ADD CONSTRAINT tbl_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.tbl_role(role_id);
 J   ALTER TABLE ONLY public.tbl_users DROP CONSTRAINT tbl_users_role_id_fkey;
       public          postgres    false    212    214    3186               G   x�3���M�KN�2�tK�+I,��2�t��MM��2�tL.����2���/*�/�2��(���I-����� ]�l            x��Y�n�Ȳ}�����I �E]�M��K�K"�q0h�-��f�M��ןUݤ,�9���L�HM�.�V�*��גg�L�D��Y
��;�
�7Z(6Rl�Sv)��КZ�Y�i�t$���ŵT�g!{�Y\D"<g�$r���L�����fiYh�D����~��?E�Y$�8�2<��B�p ���6�Xl-�����,�Cc]�@	2���:�~���}��l���.�^�̷N̟��������i6�����f�i8-�k;���3��o%���dL�R�2�	���$a*}��62����j��/D\Ln��A�,��X<�,�'?�<ָ]�_ KŷB���e g
��$�'�"�8���"q`{2E�`�,�U
�T��
Y[p]&�D�J��R�7�Pd"��^�9]gSR&�ps�D���"
Y\��k"j+� 7�2������f��VtA.0ڄ��p��ǧK�6���s���3`Sxk�$�����m�﷈vN� YHPd
 7O\�S�&���ceHҿDj2�̐ gC`%��q +������4�}w�V��ךs�����nyw�s��K^�i�y����-��D���x����w���>�A`{v��3�Lp��]f<7�A��Me������Gǽ���rw85��������}}g��tμ�0�˄p�'�_g�I���";�j���uSt#^0��S ��A����#�ᢪp	؁��5t�� (�l!B�������P.+���%���N`ӥ���8-D��8���
�V�-�\�]E!T'ux��N��q�8j��><������ܿ�N�����R(0�F�Dq�C��Q̩bs�36��|3z���Xf���M�,?A]Z��cJ�8b������R$uC�zE|rQ���"���׎��]���x9���Q,��������;�<g6~`��r5^�S��:�!��%*bkؿ���2�#&Ȇ+�Ĕ���\�4��@�uGһ�G�����f���]K��rM���s�Q�RL]�H�4�?y${@���G
4<B�>�{�u	��@��`�D,/��W�p%Ϋ�Xv&�Ц6��@&�,Q���1-B�������Ɛ������k7p������>���x2�?,W��0T<����i�N� � ���rT��nQ +���^%k�%���:��lt�Ga:6*R���S��MCew���ƞ�:�V7c6�����5�F�u{��H��y��![�s Q0�/�5ҫ�j��7<ȩg�1źԆ]j���{�ն;L�:t'<|C�w�U��j8�|ڿ2�8��r5X\�.&�
|�jTl����,��S����qU��!ab{)�X�5�
���kB#�Ju�d�FC6�o7��~�]Bmc��ڻ�N�ߚ��[{�
Tl��#���)a��∯%��Y.�B�֭���k�VWȔz����:�F0�S�GB=����[}"��%-@y$xHbg�#���˽���)7�O0Fk_M���Y�%�g�X�ۮƛ�P���X��j��]j2Ehq���=tV��Q`@kp+4meo������Sc�B_��o���]|��C�a}=���������H�Nl��㺬d%?�Hg`\��v�;X��JLd#V)[@q}��횫c����5���+��	���ury����lGO?kz�b|9����ZCTp�7�FQ�FkD���LJ�ϕX��]Q.b�M�G
�6\����^���|wa.>��۰�e�(_�w�@��g����+�L3�g�V�����"ۨL�"r#Yر�@�$��+�ѹ%� �8�Fn�#W��ݶG��t��m�Н���o"���@*�f���O��f��j����D��|Y壠SMd��xk�U�i�Vd��QHFr������eă3ߐ���]��De{��u}�]H����]��w�S�����.�m��;�|��e�<E�x"ꬂ7�qRX� �-��V�z. ��`� �)������9���:��-9�h��|�5E��(ΑyCb8��g�(��r���Pʮ�f�}�%4;�Q� 	�(D�!̔t�%)�����c����4/���ņ��t����s)���ưQ���5��M�*T�=��Gtq�AAZt~�Ӥ}�o�a�����1������#hc42͚^���9�P�	�;����䃈�B3;�i|���`�+�������b�%�G�wY	hC~����)\ 5K�|
����6�.'�6x�,�9PW�7��jy:I҄L��E@�Ċ�J�&�n�tT�D��e�1-�jm��u��5��.��
�P�i�5��hp3/�˦�	�Z��D3��s�˝��
Z�!��y5GV�<!s�L<s�.�$���fu]��{�f��?5=�����������t����F���y@d��e	-f���Z�J>����?$EhR�ک�h7ڍ���f.̇9jwjL�����7ѣ�����@:���72�qI�<O�������T��k�@Xf�0$�	��,��\��,^74��r��B��R�����]��
7�����x*R*�7�n���^z��/�7a��'��_%���KP܁�
m�w���33��ޣǑ}���<	�B�3�/�D��Y�G&(A���
?�M!�9��\��F�F(���΂	g!جmv�R�G�?�S���oJh��W�<v\���.�3�e.=S$��<X�O�u��Q�:&L߸%k�-B@��jg�����7U.�Su�Z١��+�N���5�m��Vצ�����ݬ5�}btm���S�e�Z�'�8Қ��6��S2�a@,�
(�L�:�"F���e]o�L2L�i�(5I���0a^��ml2���e��hX��"A��W��n��&�7BI^ȵԨ�s�r��aJ�##:v�)�d�P�udȕĮS��̲�?4��bZy�I\��+�>��m�#	��µ�	,ҵP����D�'�A��e���.���YY��qk�׌�F8%b���(rU�Y���� �+�q��_���H�aH�.��)3�%�Q�.|�Ѿק��%�\��)�;z5�g�Ů=8]�$��33��x��IӢؼ����ۡ��^*@D	���=U�YaO+x���\D2eڎ��_bxӮV=�E�����#p�y��>�i笢���`4���H�{};r/>B�)N�v�2;c~�����l]���q��$̯�q�m6Da���n�	� (�(R�ƶi,!��\NJ7����{g7޽kb>��o��`6�f�}��R +��/$��6Ns23	 G	(�����9���{���!�OklZ嫣������I�O����d���}?D���Ι�9��|��ff&�(	�a�
��	�-ךxo������5#���\�"N%L�J�%j�T8}��8Z֜S[�kz�Fe�3�]��`�ܽS	���y�}g}�$�a����Zԯ�>�(c3�p�nF�����R.i�T4�� dj�0�6D'i�zΊ�������� ȉ,� ۊj_�R.Ja�Uŷka�^�%�A�*�Q�N��N _�O���z�J �,�/�R�>�)�\ц��[մ�L� -|n^��Ӿ�H! ��z.M��Ԥe��F�kۇ�3kn׆�4=��x���^\��xvh�u�k�ȹ1�-�*�HԃKE3d�}��@�S������J�+hs��hh<4!pFl��ćo��4��CIhr�^����	q�$���)0�.m'�0�ѡ1��WMV�pF@&��K[��+�@Q�ȳ��R�H+�At��23�/��q��{����0%b8) ����e��o��0@�
}���q<�.�B���pyi�B�m�(֯13��U��ΌQo�Q��`�[4uf�c�4<f�ğ�ED�縔n���^���<χ_������(x�J��t�����\��1�)���o@�
8u3����B��ia��Y��* njuC_x�^��k�n��5m�~�)����������-y��3�w̖`���o���j�u!�*:B� �   ON�����ٵ��%7Q�GXԵ 999����f���d���4f��s�;)����2VF!��܃Q>�P��A�sm�9�"��1
;�=��]z�k�z�ɾ�o=o�2��6f������ XF�����������ʫFW�Ħ����0.����~����vz֩���b9�����?%�;������� �f�~            x������ � �             x�3�LL����2�L.-.��M-����� Y��      	   �   x�m�1�0����(s��gH7:�m����
�:yy�>+^i�!��C��1rd�iܭ �.�]Jn�m�C{`���`���m>�@l۳gƯU����L�U|w�/پm�hS���z�?U`KKաFyg��,         �   x�e�I�0  �sygB�Z�HXTj�A!�R��
���׫g��/ �� ˥���d�2�:�th��	�!��n����0�0��3��	���9r��Z����|�u� ���?�F�����+�^�Ф=���*[���y�{���!ww�<�}㻡i�8F     