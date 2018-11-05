//package com.framework.util;
//
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.xssf.usermodel.XSSFCell;
//import org.apache.poi.xssf.usermodel.XSSFRow;
//import org.apache.poi.xssf.usermodel.XSSFSheet;
//import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class ExcelUtil {
//    public static List<Map<String , Object>>deal_excel_xls(InputStream in)throws Exception{
//        List<Map<String ,Object>>reList = new ArrayList<>();
//        HSSFWorkbook hssfWorkbook=new HSSFWorkbook(in);
//        for(int i=0;i<hssfWorkbook.getNumberOfSheets();i++){
//            HSSFSheet hssfSheet=hssfWorkbook.getSheetAt(i);
//            if (hssfSheet!=null){
//                for (int j=0;j<=hssfSheet.getLastRowNum();j++){
//                    HSSFRow hssfRow = hssfSheet.getRow(j);
//                    if(hssfRow!=null){
//                        Map<String , Object>map = new HashMap<>();
//                        for (int k=0;k<3;k++){
//                            HSSFCell hssfCell = hssfRow.getCell(k);
//                            if (hssfCell!=null){
//                                hssfCell.setCellType(Cell.CELL_TYPE_STRING);
//                                map.put(k+"",hssfCell.getStringCellValue());
//                            }
//                        }
//                        reList.add(map);
//                    }
//                }
//            }
//        }
//        return reList;
//    }
//
//    public static List<Map<String , Object>>deal_excel_xlsx(InputStream in)throws Exception{
//        List<Map<String ,Object>>reList = new ArrayList<>();
//        XSSFWorkbook xssfWorkbook=new XSSFWorkbook(in);
//        for(int i=0;i<xssfWorkbook.getNumberOfSheets();i++){
//            XSSFSheet xssfSheet=xssfWorkbook.getSheetAt(i);
//            if (xssfSheet!=null){
//                for (int j=0;j<=xssfSheet.getLastRowNum();j++){
//                    XSSFRow xssfRow = xssfSheet.getRow(j);
//                    if (xssfRow!=null){
//                        Map<String , Object>map = new HashMap<>();
//                        for (int k=0;k<3;k++){
//                            XSSFCell xssfCell = xssfRow.getCell(k);
//                            if (xssfCell!=null){
//                                xssfCell.setCellType(Cell.CELL_TYPE_STRING);
//                                map.put(k+"",xssfCell.getStringCellValue());
//                            }
//                        }
//                        reList.add(map);
//                    }
//                }
//            }
//        }
//        return reList;
//    }
//}
