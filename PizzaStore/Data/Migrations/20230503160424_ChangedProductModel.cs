using Microsoft.EntityFrameworkCore.Migrations;

namespace PizzaStore.Data.Migrations
{
    public partial class ChangedProductModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductSize_ProductId",
                table: "ProductSize");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSize_ProductId",
                table: "ProductSize",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductSize_ProductId",
                table: "ProductSize");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSize_ProductId",
                table: "ProductSize",
                column: "ProductId",
                unique: true);
        }
    }
}
