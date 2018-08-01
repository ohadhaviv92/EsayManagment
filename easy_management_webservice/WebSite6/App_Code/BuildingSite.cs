﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for BuildingSite
/// </summary>
public class BuildingSite
{

    
    public int siteID { get; set; }
    public string siteName { get; set; }
    public string siteAddress { get; set; }
    public bool siteStatus { get; set; }


    public BuildingSite(int siteID, string siteName, string siteAddress, bool siteStatus)
    {
        this.siteID = siteID;
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.siteStatus = siteStatus;
    }
}