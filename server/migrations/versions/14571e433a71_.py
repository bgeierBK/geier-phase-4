"""empty message

Revision ID: 14571e433a71
Revises: 
Create Date: 2024-05-28 15:26:06.787500

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14571e433a71'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('badges_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('age', sa.String(), nullable=True),
    sa.Column('email_address', sa.String(), nullable=True),
    sa.Column('_hashed_password', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('carts_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cart_user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['cart_user_id'], ['users_table.id'], name=op.f('fk_carts_table_cart_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_badge_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('badge_id', sa.Integer(), nullable=True),
    sa.Column('display', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['badge_id'], ['badges_table.id'], name=op.f('fk_user_badge_table_badge_id_badges_table')),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_user_badge_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('items_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('img_url', sa.String(), nullable=True),
    sa.Column('item_user_id', sa.Integer(), nullable=True),
    sa.Column('item_cart_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['item_cart_id'], ['carts_table.id'], name=op.f('fk_items_table_item_cart_id_carts_table')),
    sa.ForeignKeyConstraint(['item_user_id'], ['users_table.id'], name=op.f('fk_items_table_item_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('items_table')
    op.drop_table('user_badge_table')
    op.drop_table('carts_table')
    op.drop_table('users_table')
    op.drop_table('badges_table')
    # ### end Alembic commands ###