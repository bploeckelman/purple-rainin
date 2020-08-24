package lando.systems.purplerainin.controllers;

import lando.systems.purplerainin.services.ExcelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

@Slf4j
@Controller
@RequestMapping("/")
public class HomeController {

    private final ExcelService excelService;

    @Autowired
    public HomeController(ExcelService excelService) {
        this.excelService = excelService;
    }

    @GetMapping
    public String index() {
        return "index";
    }

    @PostMapping
    public ResponseEntity<String> excel() {
        String fileName = "2020-08-05_THOR_18h_zma_CV.xlsx";
        var optionalWorkbook = excelService.openExcelFile(fileName);
        if (optionalWorkbook.isEmpty()) {
            return notFound().build();
        }
        var workbook = optionalWorkbook.get();

        var sheet = workbook.getSheetAt(workbook.getActiveSheetIndex());
        int firstRow = 1, firstCol = 1;
        int lastRow  = sheet.getPhysicalNumberOfRows() - 1;
        int lastCol  = sheet.getRow(firstRow).getPhysicalNumberOfCells() - 2;
        var response = excelService.getCellValuesForRange(sheet, firstRow, firstCol, lastRow, lastCol);

        return ok(response);
    }

}
